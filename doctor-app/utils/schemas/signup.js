import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "First Name must be real name").max(30).required("First Name is required"),
  email: Yup.string().email("Email must be valid email").required("Email is required"),
  mobile: Yup.string().trim().matches(/^05(9[987542]|6[982])\d{6}$/, { message: "Mobile must be valid phone number" }),
  password: Yup.string().min(8, "Password is 8 char long").required("Password is require"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password and confirm must match").required("Confirm password is require")
});

export default signupSchema;