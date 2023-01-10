import { NextApiRequest } from "next";
import TUser from "./user.type";

export type TUserServiceResponse = {
  status: number;
  message?: string;
  error?: string;
};

export type TUserServiceResponseWithUser = TUserServiceResponse & {
  user?: TUser;
};

export type TUserServiceResponseWithUsers = TUserServiceResponse & {
  users?: TUser[];
};

export type TUserServiceResponseWithData = TUserServiceResponse & {
  data?: any;
};

export type TUserService = {
  register: (req: NextApiRequest) => Promise<TUserServiceResponseWithUser>;
  login: (
    email: string,
    password: string
  ) => Promise<TUserServiceResponseWithData>;
  getAll: () => Promise<TUserServiceResponseWithUsers>;
  get(email: string): Promise<TUserServiceResponseWithUser>;
  getByEmail: (email: string) => Promise<TUserServiceResponseWithUser>;
  signToken: (user: TUser) => string;
  update: (
    userId: string,
    user: TUser
  ) => Promise<TUserServiceResponseWithUser>;
  delete: (userId: string) => Promise<TUserServiceResponse>;
  isAuthenticated: (req: NextApiRequest) => Promise<boolean>;
};
