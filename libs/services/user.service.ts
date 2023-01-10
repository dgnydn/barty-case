import { NextApiRequest } from "next";
import User from "../models/User.model";
import type TUser from "../types/user.type";
import type {
  TUserService,
  TUserServiceResponse,
  TUserServiceResponseWithData,
  TUserServiceResponseWithUser,
  TUserServiceResponseWithUsers,
} from "../types/service.type";
import registerValidationSchema from "../validations/register.validation";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default class UserService implements TUserService {
  private user: User;

  constructor() {
    this.user = new User();
  }

  async register(req: NextApiRequest): Promise<TUserServiceResponseWithUser> {
    const { user: data } = req.body;

    if (!data) {
      return { status: 400, error: "Missing user data" };
    }

    const isValid = await registerValidationSchema.isValid(data);

    if (!isValid) {
      return { status: 400, error: "Invalid user data" };
    }

    const userExists = await this.user.findUserByEmail(data.email);
    if (userExists) {
      return { status: 409, error: "User already exists" };
    }

    delete data.passwordAgain;
    data.bornAt = new Date(data.bornAt);

    const loc = data.location.split(",").map((x: any) => parseFloat(x));
    data.location = {
      type: "Point",
      coordinates: [loc[0], loc[1]],
    };

    data.password = await bcrypt.hash(data.password, 10);

    try {
      const registered: TUser = await this.user.create(data);
      return { status: 201, message: "User created", user: registered };
    } catch (error) {
      return { status: 400, error: "User not created" };
    }
  }

  signToken(user: TUser): string {
    const { password, ...rest } = user;
    const token = jwt.sign({ user: rest }, process.env.SECRET!, {
      algorithm: "HS512",
      expiresIn: "10m",
    });
    return token;
  }

  async login(
    email: string,
    password: string
  ): Promise<TUserServiceResponseWithData> {
    const data = new User();
    const user = await data.findUserByEmail(email);
    if (user) {
      if (await bcrypt.compare(password as string, user.password as string)) {
        const { password, ...rest } = user;
        const token = this.signToken(user);
        console.log(token);
        return {
          status: 200,
          message: "User logged in",
          data: { ...rest, token },
        };
      }

      return { status: 401, error: "Invalid password" };
    } else {
      return { status: 404, error: "User not found" };
    }
  }

  async getAll(): Promise<TUserServiceResponseWithUsers> {
    const users: TUser[] = await this.user.all();
    if (!users) {
      return { status: 404, error: "No users found" };
    }
    users.map((user) => {
      delete user.password;
    });
    return { status: 200, users };
  }

  async get(id: string): Promise<TUserServiceResponseWithUser> {
    const user = await this.user.findUserById(id);
    if (!user) {
      return { status: 404, error: "User not found" };
    }

    delete user.password;
    return { status: 200, message: "User found", user };
  }

  async getByEmail(email: string): Promise<TUserServiceResponseWithUser> {
    const user = await this.user.findUserByEmail(email);
    if (!user) {
      return { status: 404, error: "User not found" };
    }

    delete user.password;
    return { status: 200, message: "User found", user };
  }

  async update(
    userId: string,
    user: TUser
  ): Promise<TUserServiceResponseWithUser> {
    const updated = await this.user.update(userId, user);
    if (!updated) {
      return { status: 404, error: "User not found" };
    }
    if (user.password) {
      delete updated.password;
      return { status: 200, message: "User updated", user: updated };
    } else {
      return { status: 500, error: "ERROR" };
    }
  }

  async isAuthenticated(req: NextApiRequest): Promise<boolean> {
    const { authorization } = req.headers;
    if (!authorization) {
      return false;
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return false;
    }

    try {
      const decoded: any = jwt.verify(token, process.env.SECRET!);
      const user = await this.user.findUserByEmail(decoded.user.email);
      if (!user) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async delete(id: string): Promise<TUserServiceResponse> {
    const deleted = await this.user.delete(id);
    if (!deleted) {
      return { status: 404, error: "User not found" };
    }

    return { status: 200, message: "User deleted" };
  }
}

// try {
//   const decoded = JSON.parse(
//     JSON.stringify(jwt.verify(authToken as string, process.env.SECRET!))
//   );

//   const userToken = decoded.user as TUser;

//   const userExist = await userService.get(userToken.id!);
//   if (!userExist) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// } catch (err) {
//   return res.status(401).json({ error: "Unauthorized" });
// }
