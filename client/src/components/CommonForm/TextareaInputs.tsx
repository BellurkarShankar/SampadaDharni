"use client";
import React from "react";
import { Textarea } from "../ui/textarea";
type TextareaInputsType = {
  name?: string;
  type?: string;
  placeholder?: string;
  fields: any;
};
const TextareaInputs = ({
  fields,
  name,
  placeholder,
  type,
}: TextareaInputsType) => {
  return <Textarea cols={4} {...fields} placeholder={placeholder} />;
};

export default TextareaInputs;
