import { useFormik } from "formik";
import { useRouter } from "next/router";
import registerValidationSchema from "../../libs/validations/register.validation";

export default function RegisterFormComponent() {
  const router = useRouter();

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      passwordAgain: "",
      bornAt: "",
      age: "",
      location: "",
      image: "",
      phoneNumber: "",
      balance: "",
      about: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ user: values }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const registered = await res.json();
      if (res.ok && registered) {
        console.log("Registered");
        alert("User successfully registered!");
        router.push("/user/login");
      } else {
        console.log("Not Registered");
        alert(`User not registered! Reason: ${registered.error}`);
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col m-10">
        <div className="flex flex-col">
          <div className="flex max-w-lg gap-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="p-1 border border-gray-400"
                onChange={handleChange}
                value={values.name}
              />
              <div className="text-sm text-red-500">
                {errors.name && errors.name}
              </div>
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                id="surname"
                name="surname"
                className="p-1 border border-gray-400"
                onChange={handleChange}
                value={values.surname}
              />
              <div className="text-sm text-red-500">
                {errors.surname && errors.surname}
              </div>
            </div>
          </div>

          <div className="flex max-w-lg gap-4 mt-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                className="p-1 border border-gray-400"
                onChange={handleChange}
                value={values.username}
              />
              <div className="text-sm text-red-500">
                {errors.username && errors.username}
              </div>
            </div>

            <div className="flex flex-col w-1/2">
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
          </div>

          <div className="flex max-w-lg gap-4 mt-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="password">Password</label>
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

            <div className="flex flex-col w-1/2">
              <label htmlFor="passwordAgain">Password (again)</label>
              <input
                type="password"
                id="passwordAgain"
                name="passwordAgain"
                className="p-1 border border-gray-400"
                onChange={handleChange}
                value={values.passwordAgain}
              />
              <div className="text-sm text-red-500">
                {errors.passwordAgain && errors.passwordAgain}
              </div>
            </div>
          </div>

          <div className="flex max-w-lg gap-4 mt-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="bornAt">Birth Day</label>
              <input
                type="datetime-local"
                id="bornAt"
                name="bornAt"
                className="w-full p-1 border border-gray-400"
                onChange={handleChange}
                value={values.bornAt}
              />
              <div className="text-sm text-red-500">
                {errors.bornAt && errors.bornAt}
              </div>
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                className="p-1 border border-gray-400"
                onChange={handleChange}
                value={values.age}
              />
              <div className="text-sm text-red-500">
                {errors.age && errors.age}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col max-w-lg mt-4">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              className="p-1 border border-gray-400"
              onChange={handleChange}
              value={values.location}
            />
            <div className="text-sm text-red-500">
              {errors.location && errors.location}
            </div>
          </div>

          <div className="flex flex-col max-w-lg mt-4">
            <label htmlFor="image">Profile Image</label>
            <input
              type="file"
              id="image"
              name="image"
              className="p-1 border border-gray-400"
              onChange={handleChange}
              value={values.image}
            />
            <div className="text-sm text-red-500">
              {errors.image && errors.image}
            </div>
          </div>

          <div className="flex flex-col max-w-lg mt-4">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="p-1 border border-gray-400"
              onChange={handleChange}
              value={values.phoneNumber}
            />
            <div className="text-sm text-red-500">
              {errors.phoneNumber && errors.phoneNumber}
            </div>
          </div>

          <div className="flex flex-col max-w-lg mt-4">
            <label htmlFor="balance">Balance</label>
            <input
              type="number"
              id="balance"
              name="balance"
              className="p-1 border border-gray-400"
              onChange={handleChange}
              value={values.balance}
            />
            <div className="text-sm text-red-500">
              {errors.balance && errors.balance}
            </div>
          </div>
        </div>

        <div className="flex flex-col max-w-lg mt-4">
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            cols={30}
            rows={10}
            className="p-1 border border-gray-400"
            onChange={handleChange}
            value={values.about}
          ></textarea>
          <div className="text-sm text-red-500">
            {errors.about && errors.about}
          </div>
        </div>

        <div className="flex flex-col max-w-lg mt-4">
          <button
            type="submit"
            className="px-4 py-3 font-bold text-white bg-blue-600 rounded"
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
}
