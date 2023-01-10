import type { NextApiRequest, NextApiResponse } from "next";
import UserService from "../../../libs/services/user.service";
import type {
  TUserService,
  TUserServiceResponse,
  TUserServiceResponseWithUser,
} from "../../../libs/types/service.type";

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: string
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: '{ status: 200, message: "User found", user }'
 *       404:
 *         description: '{ status: 404, error: "User not found" }'
 *   put:
 *     summary: Update user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Authorization token.
 *         required: true
 *         type: string
 *       - in: path
 *         name: userId
 *         type: string
 *         required: true
 *         description: User id
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
 *     responses:
 *       200:
 *         description: '{ status: 200, message: "User updated", user: updated }'
 *       404:
 *         description: '{ status: 404, error: "User not found" }'
 *       401:
 *         description: '{ status: 401, error: "Unauthorized" }'
 *   delete:
 *     summary: Delete user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Authorization token.
 *         required: true
 *         type: string
 *       - in: path
 *         name: userId
 *         type: string
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: '{ status: 200, message: "User deleted" }'
 *       404:
 *         description: '{ status: 404, error: "User not found" }'
 *       401:
 *         description: '{ status: 401, error: "Unauthorized" }'
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userService: TUserService = new UserService();

    if (!(await userService.isAuthenticated(req))) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { userId } = req.query;
    const user: TUserServiceResponseWithUser = await userService.get(
      userId as string
    );
    return res.status(user.status).json(user);
  } else if (req.method === "PUT") {
    const userService: TUserService = new UserService();

    if (!(await userService.isAuthenticated(req))) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { userId } = req.query;
    const user: TUserServiceResponseWithUser = await userService.update(
      userId as string,
      req.body.user
    );
    return res.status(user.status).json(user);
  } else if (req.method === "DELETE") {
    const userService: TUserService = new UserService();

    if (!(await userService.isAuthenticated(req))) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { userId } = req.query;
    const data: TUserServiceResponse = await userService.delete(
      userId as string
    );
    return res.status(data.status).json(data);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
