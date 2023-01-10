import LayoutComponent from "../../components/layout.component";
import RegisterFormComponent from "../../components/forms/register.component";

export default function RegisterPage() {
  return (
    <LayoutComponent>
      <div className="font-medium">
        <h1 className="m-10 text-3xl font-bold">Register</h1>
        <RegisterFormComponent />
      </div>
    </LayoutComponent>
  );
}
