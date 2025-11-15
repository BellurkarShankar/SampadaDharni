"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  FilterSizeByColorType,
  ProductFormFieldType,
  sizes,
  variantFormData,
  variantSchema,
  VariantSchemaType,
} from "../schemaValidationAndFormData/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonForm from "@/components/CommonForm/CommonForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Upload from "../ImageUpload/Upload";
import { toast } from "sonner";
import VariantLists from "../ShowVarients/VarientLists";

type AddVariantsOfProductType = {
  variants: VariantSchemaType[];
  setVariants: React.Dispatch<React.SetStateAction<VariantSchemaType[]>>;
  setFilterSizeByColor: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  filterSizeByColor: Record<string, string[]>;
  setUploadedImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  uploadedImageUrls: string[];
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
  previewUrls: string[];
  isUploaded: boolean;
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  setVariantDialogFlag: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddVariantsOfProduct = ({
  setVariants,
  setFilterSizeByColor,
  filterSizeByColor,
  setUploadedImageUrls,
  uploadedImageUrls,
  isUploaded,
  previewUrls,
  setIsUploaded,
  setPreviewUrls,
  setVariantDialogFlag,
}: AddVariantsOfProductType) => {
  const [colorForFilter, setColorForFilter] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [filterSize, setFilterSizes] = useState<string[]>([]);

  const form = useForm<VariantSchemaType>({
    resolver: zodResolver(variantSchema),
    mode: "onChange",
    defaultValues: {
      color: "",
      images: [],
      price: "",
      size: "",
      sku: "",
      stock: "",
    },
  });
  const colorHandlePressed = async (color: string) => {
    setColorForFilter(color);
    setFilterSizes(
      sizes.filter((size) => !filterSizeByColor?.[color].includes(size))
    );
  };
  const handleVariants = async (variantsData: VariantSchemaType) => {
    startTransition(async () => {
      try {
        setFilterSizeByColor((prev) =>
          prev[variantsData.color].includes(variantsData.size)
            ? { ...prev }
            : {
                ...prev,
                [variantsData.color]: [
                  ...(prev[variantsData.color] ?? []),
                  variantsData.size,
                ],
              }
        );
        if (uploadedImageUrls && uploadedImageUrls.length !== 0) {
          setVariants((prev) => [
            ...prev,
            {
              ...variantsData,
              images: uploadedImageUrls,
              sku: `${variantsData.color}-${variantsData.size}-#`,
            },
          ]);
          form.reset();
          setVariantDialogFlag(false);
        }
      } catch (error) {
        toast.error("Something went wrong while uploading the image");
      }
    });
  };

  return (
    <Form {...form}>
      <Upload
        setUploadedImageUrls={setUploadedImageUrls}
        uploadedImageUrls={uploadedImageUrls}
        previewUrls={previewUrls}
        setPreviewUrls={setPreviewUrls}
        isUploaded={isUploaded}
        setIsUploaded={setIsUploaded}
      />
      <form
        id="product-variant-form"
        onSubmit={form.handleSubmit(handleVariants)}
        className="px-4 py-4"
      >
        <div
          className={`${
            uploadedImageUrls && uploadedImageUrls.length === 0
              ? "pointer-events-none opacity-50"
              : ""
          }`}
        >
          {variantFormData && variantFormData.length > 0
            ? variantFormData.map((menu: ProductFormFieldType, index) => {
                return (
                  <CommonForm
                    key={index}
                    form={form}
                    formData={menu}
                    filterData={filterSizeByColor}
                    selectInputData={filterSize}
                    colorHandlePressed={colorHandlePressed}
                    className="w-full"
                  />
                );
              })
            : null}
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            form="product-variant-form"
            variant={"outline"}
            className=""
            disabled={!form.formState.isValid}
          >
            Add Variant
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddVariantsOfProduct;
