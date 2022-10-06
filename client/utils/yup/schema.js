import * as yup from "yup";

export const schemaSignup = yup
  .object()
  .shape({
    name: yup.string().required("required"),
    email: yup.string().email().required("required"),
    password: yup.string().min(8).required("required"),
  })
  .required();

export const schemaLogin = yup
  .object()
  .shape({
    email: yup.string().email().required("required"),
    password: yup.string().min(8, "too short").required("required"),
  })
  .required();

export const schemaActivateAccount = yup
  .object()
  .shape({
    email: yup.string().email(),
    otp: yup.string().required("required"),
  })
  .required();

export const updateProfile = yup
  .object()
  .shape({
    userImage: yup.string(),
    name: yup.string().required(),
  })
  .required();

export const changePassword = yup
  .object()
  .shape({
    currentPassword: yup.string().min(8, "too short").required(),
    newPassword: yup.string().min(8, "too short").required(),
  })
  .required();
