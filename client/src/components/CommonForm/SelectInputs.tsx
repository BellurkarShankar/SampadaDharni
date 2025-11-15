"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  BrandType,
  CategoryOfProductType,
} from "../super-admin_components/schemaValidationAndFormData/productSchema";
type SelectInputsType = {
  field: any;
  placeholder?: string;
  selectItemData:
    | BrandType[]
    | CategoryOfProductType[]
    | string[]
    | undefined
    | null;
  name: string;
  className?: string;
};
const SelectInputs = ({
  field,
  placeholder,
  selectItemData,
  name,
  className,
}: SelectInputsType) => {
  return (
    <Select
      key={field.value || "empty"}
      value={field.value}
      onValueChange={field.onChange}
    >
      <SelectTrigger className={`${className ? className : "w-full h-full"}`}>
        <SelectValue placeholder={placeholder || "Select Options"} />
      </SelectTrigger>
      <SelectContent className="">
        {selectItemData && selectItemData.length > 0
          ? name === "brand"
            ? (selectItemData as BrandType[]).map(
                (brandData, index: number) => {
                  return (
                    <SelectItem
                      key={`index-${brandData.brandLabel + index}`}
                      value={brandData.brandValue}
                    >
                      {brandData.brandLabel}
                    </SelectItem>
                  );
                }
              )
            : name === "category"
            ? (selectItemData as CategoryOfProductType[]).map(
                (itemData, index: number) => {
                  return (
                    <SelectItem
                      key={itemData.categoryId}
                      value={itemData.categoryValue}
                    >
                      {itemData.categoryLabel}
                    </SelectItem>
                  );
                }
              )
            : name === "gender"
            ? (selectItemData as string[]).map((items, index) => {
                return (
                  <SelectItem key={index} value={items}>
                    {items}
                  </SelectItem>
                );
              })
            : name === "size"
            ? (selectItemData as string[]).map((items, index) => {
                return (
                  <SelectItem key={index} value={items}>
                    {items}
                  </SelectItem>
                );
              })
            : null
          : null}
      </SelectContent>
    </Select>
  );
};

export default SelectInputs;
