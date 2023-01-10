import type { NextApiRequest, NextApiResponse } from "next";
import UserService from "../../../libs/services/user.service";
import type { TUserServiceResponseWithUsers } from "../../../libs/types/service.type";

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Get all users
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Authorization token.
 *         required: true
 *         type: string
 *     responses:
 *       401:
 *         description: '{ status: 401, error: "Unauthorized" }'
 *       404:
 *         description: '{ status: 404, error: "No users found" }'
 *       200:
 *         description: '{ status: 200, users: users }'
 *   post:
 *     description: Create a new user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: body
 *         name: user
 *         type: object
 *         description: The user to create.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             passwordAgain:
 *               type: string
 *             username:
 *               type: string
 *             name:
 *               type: string
 *             surname:
 *               type: string
 *             age:
 *               type: number
 *             bornAt:
 *               type: string
 *             location:
 *               type: string
 *             about:
 *               type: string
 *             image:
 *               type: string
 *             balance:
 *               type: number
 *             phoneNumber:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: '{ status: 201, message: "User created", user: registeredUserData }'
 *       400:
 *        description: '{ status: 400, error: "Missing user data" } or { status: 400, error: "Invalid user data" }'
 *       409:
 *        description: '{ status: 409, error: "User already exists" }'
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userService = new UserService();
  if (req.method === "POST") {
    const data = await userService.register(req);
    return res.status(data.status).json(data);
  }

  if (req.method === "GET") {
    if (!(await userService.isAuthenticated(req))) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const users: TUserServiceResponseWithUsers = await userService.getAll();
    return res.status(users.status).json(users);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
