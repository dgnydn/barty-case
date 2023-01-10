import type { NextApiRequest, NextApiResponse } from "next";
import UserService from "../../../libs/services/user.service";
import type {
  TUserService,
  TUserServiceResponseWithData,
} from "../../../libs/types/service.type";

/**
 * @swagger
 * /api/users/authenticate:
 *  post:
 *    tags:
 *       - Users
 *    description: Authenticate a user
 *  parameters:
 *    - in: body
 *      name: user
 *      type: object
 *      description: The user to authenticate.
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *  responses:
 *    405:
 *      description: '{ status: 405, error: "Method not allowed" }'
 *    200:
 *      description: '{ status: 200, message: "User logged in", data: { ...user, token }};'
 *    401:
 *      description: '{ status: 401, error: "Invalid password" }'
 *    404:
 *      description: '{ status: 404, error: "User not found" }'
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body.user;

  const userService: TUserService = new UserService();
  const user: TUserServiceResponseWithData = await userService.login(
    email,
    password
  );
  return res.status(user.status).json(user);
}
