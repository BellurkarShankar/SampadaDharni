export type FormFieldsDataType = {
  name: string;
  label: string;
  Input: string;
  placeholder?: string;
  inputType: string;
};
export const FormDataOfLoginPage: FormFieldsDataType[] = [
  {
    name: "email",
    Input: "Input",
    inputType: "text",
    label: "Email ID",
    placeholder: "Enter Email Address",
  },
  {
    name: "password",
    Input: "Input",
    inputType: "password",
    label: "Password",
    placeholder: "*******",
  },
];

export const FormDataOfSignUpPage: FormFieldsDataType[] = [
  {
    Input: "Input",
    inputType: "text",
    label: "Full Name",
    name: "name",
    placeholder: "Enter your Full Name..",
  },
  {
    Input: "Input",
    inputType: "email",
    label: "Email ID",
    name: "email",
    placeholder: "Enter your Email ID..",
  },
  {
    Input: "Input",
    inputType: "password",
    label: "Password",
    name: "password",
    placeholder: "New Password..",
  },
  {
    Input: "Input",
    inputType: "password",
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Re-enter Password..",
  },
];
