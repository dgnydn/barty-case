import * as yup from "yup";

const registerValidationSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  passwordAgain: yup
    .string()
    .required()
    .equals([yup.ref("password")]),
  bornAt: yup.date().required(),
  age: yup.number().required(),
  location: yup.string().required(),
  image: yup.string().required(),
  phoneNumber: yup.string().required(),
  balance: yup.number().required(),
  about: yup.string().required(),
});

export default registerValidationSchema;
