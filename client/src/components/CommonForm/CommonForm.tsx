"use client";
import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormFieldsDataType } from "../auth_components/authFormData";
import InputText from "./InputText";
import { Input } from "../ui/input";
type FormFieldType = {
  form: any;
  formData: FormFieldsDataType;
};
const CommonForm = ({ form, formData }: FormFieldType) => {
  return (
    <FormField
      name={formData.name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={`${
              formData.name === "email" ||
              formData.name === "name" ||
              formData.name === "password" ||
              formData.name === "confirmPassword"
                ? "text-[14px] text-sky-600"
                : ""
            }`}
          >
            {formData.label}
          </FormLabel>
          <FormControl>
            {formData && formData.Input === "Input" ? (
              <InputText
                key={formData.name}
                fields={field}
                placeholder={formData.placeholder}
                type={formData.inputType}
                name={formData.name}
              />
            ) : (
              <Input type="text" />
            )}
          </FormControl>
          <FormMessage />
          <FormDescription />
        </FormItem>
      )}
    />
  );
};

export default CommonForm;
