"use client";
import React from "react";
import { Input } from "../ui/input";

type InputFieldType = {
  name?: string;
  type?: string;
  placeholder?: string;
  fields: any;
};

const InputText = ({ type, placeholder, fields, name }: InputFieldType) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      {...fields}
      className={`w-full ${
        name === "email" ||
        name === "name" ||
        name === "password" ||
        name === "confirmPassword"
          ? "h-14 my-2 px-4 text-[16px]"
          : ""
      }`}
    />
  );
};

export default InputText;
