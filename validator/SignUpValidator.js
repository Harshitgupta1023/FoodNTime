import * as Yup from "yup";

export const UserSignUpValidator = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required()
    .min(3, "Name must have at least 3 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(8, "Password must have at least 8 characters "),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const VendorSignUpValidator = Yup.object().shape({
  storeName: Yup.string()
    .label("Store Name")
    .required()
    .min(3, "Name must have at least 3 characters"),
  storeAddress: Yup.string()
    .label("Store Address")
    .required()
    .min(10, "Name must have at least 10 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(8, "Password must have at least 8 characters "),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
