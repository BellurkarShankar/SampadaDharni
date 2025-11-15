"use client";
import React, { useRef, useState } from "react";
import {
  ColorsOfProductType,
  SizeType,
} from "../super-admin_components/schemaValidationAndFormData/productSchema";

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

import { toast } from "sonner";
import { Check } from "lucide-react";
type ToggleButtonsType = {
  fields?: any;
  toggleData: ColorsOfProductType[] | SizeType[];
  toggleDataName: string;
  toggleFunction?: (value: string) => void;
  selectedToggleData?: string[];
  filterData?: Record<string, string[]>;
};
const ToggleButtons = ({
  fields,
  toggleData,
  toggleDataName,
  filterData,
  toggleFunction,
}: ToggleButtonsType) => {
  return (
    <ToggleGroup
      type="single"
      onValueChange={(value) => {
        fields.onChange(value);
        toggleFunction?.(value);
      }}
      className="flex-wrap gap-x-2 gap-y-4"
    >
      {toggleData && toggleData.length > 0 && toggleDataName
        ? toggleDataName === "size"
          ? (toggleData as SizeType[]).map((dataItem, ind) => {
              return (
                <ToggleGroupItem
                  key={dataItem}
                  variant={"outline"}
                  value={dataItem}
                  className={`w-10 h-10 border mx-1 data-[spacing=0]:rounded-full data-[state=on]:bg-gray-900 data-[state=on]:ring-2 data-[state=on]:ring-offset-2 data-[state=on]:text-white data-[spacing=0]:shadow-sm data-[spacing=0]:first:rounded-l-full data-[spacing=0]:last:rounded-r-full  cursor-pointer`}
                >
                  {dataItem}
                </ToggleGroupItem>
              );
            })
          : toggleDataName === "color"
          ? (toggleData as ColorsOfProductType[]).map((dataItem) => {
              return (
                <ToggleGroupItem
                  key={dataItem.colorLabel}
                  value={dataItem.colorLabel}
                  className={` relative group
                   w-10 h-10 border mx-1 data-[state=on]:*:[svg]:fill-green-500 data-[spacing=0]:rounded-full data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-full data-[spacing=0]:last:rounded-r-full ${dataItem.colorCode} ${dataItem.hex} hover:${dataItem.colorCode} hover:${dataItem.hex} cursor-pointer scale-90 hover:scale-110 transition-all duration-300 ease-in-out `}
                >
                  {dataItem.colorLabel[0]}
                  <span className="absolute hidden border -top-7 rounded-2xl bg-background px-2 py-0.5 text-black group-hover:block">
                    {dataItem.colorLabel}
                  </span>
                </ToggleGroupItem>
              );
            })
          : null
        : null}
    </ToggleGroup>
  );
};

export default ToggleButtons;
