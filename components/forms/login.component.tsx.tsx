import { useFormik } from "formik";
import { useRouter } from "next/router";
import { TUserServiceResponseWithData } from "../../libs/types/service.type";
import loginValidationSchema from "../../libs/validations/login.validation";

export default function LoginFormComponent() {
  const router = useRouter();

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      const res = await fetch("/api/users/authenticate", {
        method: "POST",
        body: JSON.stringify({ user: values }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const loggedIn: TUserServiceResponseWithData = await res.json();
      console.log(loggedIn);
      if (res.ok && loggedIn) {
        console.log("Logged In");
        localStorage.setItem("token", loggedIn.data.token);
        alert("User successfully logged in!");
        router.push("/");
      } else {
        console.log("Not Registered");
        alert(`Can't authenticate user! Reason: ${loggedIn.error}`);
      }
    },
  });
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-4"
    >
      <div className="flex flex-col w-full max-w-lg px-10">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="p-1 border border-gray-400"
          onChange={handleChange}
          value={values.email}
        />
        <div className="text-sm text-red-500">
          {errors.email && errors.email}
        </div>
      </div>

      <div className="flex flex-col w-full max-w-lg px-10">
        <label htmlFor="email">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="p-1 border border-gray-400"
          onChange={handleChange}
          value={values.password}
        />
        <div className="text-sm text-red-500">
          {errors.password && errors.password}
        </div>
      </div>

      <div className="flex flex-col w-full max-w-lg px-10">
        <button type="submit" className="p-2 text-white bg-blue-500 rounded-md">
          Login
        </button>
      </div>
    </form>
  );
}
