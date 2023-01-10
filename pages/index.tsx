import { signIn, signOut, useSession } from "next-auth/react";
import LayoutComponent from "../components/layout.component";

export default function HomePage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <LayoutComponent>
        Token: {session.user.token}
        <h1>Home</h1>
        <button onClick={() => signOut()}>Sign out</button>
      </LayoutComponent>
    );
  } else {
    return (
      <LayoutComponent>
        <h1>Home</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </LayoutComponent>
    );
  }
}
