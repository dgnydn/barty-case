import NextAuth, { AuthOptions, Session, User, Awaitable } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import UserService from "../../../libs/services/user.service";
import type { TUserService } from "../../../libs/types/service.type";
export const authOptions: AuthOptions = {
  secret: process.env.SECRET,
  // Configure one or more authentication providers
  callbacks: {
    session({ session }: { session: Session }): Awaitable<Session> {
      const userService: TUserService = new UserService();
      return Promise.resolve(
        userService.getByEmail(session.user!.email!).then((res) => {
          session.user = {
            name: res.user!.name!,
            email: res.user!.email!,
            token: userService.signToken(res.user!),
          };
          return session;
        })
      );
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      id: "login-with-credentials",
      credentials: {
        email: {
          label: "E-Mail",
          type: "email",
          placeholder: "name@email.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const userService: TUserService = new UserService();
        const loginStatus = await userService.login(
          credentials!.email,
          credentials!.password
        );
        return loginStatus.status === 200 ? loginStatus.data : null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
