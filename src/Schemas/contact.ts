import * as Yup from "yup";

export const ContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("This field es required")
    .min(3, "Min 3 characters required ")
    .max(15, "Max 15 characters required"),
  lastName: Yup.string()
    .required("This field es required")
    .min(3, "Min 3 characters required ")
    .max(15, "Max 15 characters required"),
  phoneNumber: Yup.number()
    .typeError("Please enter a valid number")
    .required("This field es required"),
});
