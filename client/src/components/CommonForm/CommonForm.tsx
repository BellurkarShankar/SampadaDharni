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
import {
  brands,
  BrandType,
  categories,
  CategoryOfProductType,
  colors,
  FilterSizeByColorType,
  Gender,
  genderData,
  ProductFormFieldType,
  sizes,
} from "../super-admin_components/schemaValidationAndFormData/productSchema";
import SelectInputs from "./SelectInputs";
import ToggleButtons from "./ToggleButtons";
import SwitchButtons from "./SwitchButtons";
import TextareaInputs from "./TextareaInputs";
import GenerateTags from "./GenerateTags";
type FormFieldType = {
  form: any;
  formData: FormFieldsDataType | ProductFormFieldType;
  colorHandlePressed?: (value: string) => void;
  sizeHandlePressed?: (value: string) => void;
  selectedToggleData?: string[];
  setFeatured?: (flag: boolean) => void;
  tags?: string[];
  setTags?: React.Dispatch<React.SetStateAction<string[]>>;
  filterData?: Record<string, string[]>;
  selectInputData?: string[];
  className?: string;
};
type SelectInputFieldType = {
  selectInputFieldName: string;
  selectItemData:
    | BrandType[]
    | CategoryOfProductType[]
    | string[]
    | undefined
    | null;
};
const CommonForm = ({
  form,
  formData,
  colorHandlePressed,
  selectedToggleData,
  sizeHandlePressed,
  setFeatured,
  setTags,
  tags,
  className,
  filterData,
  selectInputData,
}: FormFieldType) => {
  const inputFields = [
    "email",
    "name",
    "password",
    "confirmPassword",
    "productName",
    "price",
    "stock",
  ];

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
            {formData &&
            formData.Input === "Input" &&
            inputFields.includes(formData.name) ? (
              <InputText
                key={formData.name}
                fields={field}
                placeholder={formData.placeholder}
                type={formData.inputType}
                name={formData.name}
              />
            ) : formData &&
              formData.Input === "Textarea" &&
              formData.name === "description" ? (
              <TextareaInputs
                key={formData.name}
                fields={field}
                placeholder={formData.placeholder}
                type={formData.inputType}
                name={formData.name}
              />
            ) : formData &&
              formData.Input === "Select" &&
              formData.name === "brand" ? (
              <SelectInputs
                field={field}
                name={formData.name}
                placeholder={formData.placeholder}
                selectItemData={brands}
              />
            ) : formData &&
              formData.Input === "Select" &&
              formData.name === "category" ? (
              <SelectInputs
                field={field}
                name={formData.name}
                placeholder={formData.placeholder}
                selectItemData={categories}
              />
            ) : formData &&
              formData.Input === "Select" &&
              formData.name === "gender" ? (
              <SelectInputs
                field={field}
                name={formData.name}
                placeholder={formData.placeholder}
                selectItemData={genderData}
              />
            ) : formData &&
              formData.Input === "Select" &&
              formData.name === "sizes" ? (
              <SelectInputs
                field={field}
                name={formData.name}
                selectItemData={selectInputData}
                placeholder={formData.placeholder}
                className={className}
              />
            ) : formData &&
              formData.Input === "Toggle" &&
              formData.name === "color" ? (
              <ToggleButtons
                fields={field}
                toggleData={colors}
                toggleDataName={formData.name}
                selectedToggleData={selectedToggleData}
                toggleFunction={colorHandlePressed}
              />
            ) : formData &&
              formData.Input === "Toggle" &&
              formData.name === "size" ? (
              <ToggleButtons
                fields={field}
                toggleData={selectInputData || []}
                toggleDataName={formData.name}
              />
            ) : formData &&
              formData.Input === "Tag" &&
              formData.name === "tags" ? (
              <GenerateTags setTags={setTags} tags={tags} />
            ) : formData &&
              formData.Input === "Switch" &&
              formData.name === "isFeatured" ? (
              <SwitchButtons setFeatured={setFeatured} />
            ) : null}
          </FormControl>
          <FormMessage />
          <FormDescription />
        </FormItem>
      )}
    />
  );
};

export default CommonForm;
