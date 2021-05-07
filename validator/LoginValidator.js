import * as Yup from "yup";

const LoginValidator = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(8, "Password must have at least 8 characters "),
});

export default LoginValidator;
