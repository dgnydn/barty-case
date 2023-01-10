import LayoutComponent from "../../components/layout.component";
import LoginFormComponent from "../../components/forms/login.component.tsx";

export default function LoginPage() {
  return (
    <LayoutComponent>
      <div className="font-medium">
        <h1 className="m-10 text-3xl font-bold">Login</h1>
        <LoginFormComponent />
      </div>
    </LayoutComponent>
  );
}
