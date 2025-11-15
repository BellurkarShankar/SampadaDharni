"use client";
import React, {
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import {
  InitialStates,
  productFormData,
  ProductFormFieldType,
  productSchema,
  ProductSchemaType,
  VariantSchemaType,
} from "../schemaValidationAndFormData/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CommonForm from "@/components/CommonForm/CommonForm";
import { Button } from "@/components/ui/button";
import { productStore } from "@/store/productStore";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddVariantsOfProduct from "../Add-Variants/AddVariantsOfProduct";
import VariantLists from "../ShowVarients/VarientLists";
import { Atom, Eye, ShoppingBasket, Sprout } from "lucide-react";
import axios from "axios";
import { RecentProductsType } from "@/utils/productTypes";
import { createProductProtection } from "@/actions/productActions";
const CreateProductForm = ({
  handleRecentProductList,
  productToBeEdit,
  setEditDialogFlag,
}: {
  productToBeEdit?: RecentProductsType;
  setEditDialogFlag?: React.Dispatch<SetStateAction<boolean>>;
  handleRecentProductList?: (
    page: number,
    limit: number,
    dateString: string
  ) => Promise<void>;
}) => {
  const [isPending, startTransition] = useTransition();
  const {
    createProduct,
    updateProductById,
    fetchAllProduct,
    isLoading,
    error: productStoreError,
  } = productStore();

  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isFeatured, setFeatured] = useState<boolean>(false);
  const [variantDialogFlag, setVariantDialogFlag] = useState<boolean>(false);
  const [variants, setVariants] = useState<VariantSchemaType[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [filterSizeByColor, setFilterSizeByColor] =
    useState<Record<string, string[]>>(InitialStates);

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      brand: "",
      category: "",
      description: "",
      gender: "MALE",
      isFeatured: false,
      productName: "",
      rating: 0,
      soldCount: 0,
      tags: [],
      variant: [],
    },
  });

  const handleProductSubmit = async (productData: ProductSchemaType) => {
    startTransition(async () => {
      try {
        const arcjetResponse = await createProductProtection();
        if (!arcjetResponse.success) {
          toast.error(arcjetResponse.message);
          return;
        }
        if (
          uploadedImageUrls &&
          uploadedImageUrls.length !== 0 &&
          tags &&
          tags.length !== 0 &&
          variants &&
          variants.length > 0 &&
          arcjetResponse.success
        ) {
          const { variant, ...rest } = productData;
          const ProductDetails = {
            ...rest,
            isFeatured: Boolean(productData.isFeatured),
            tags: [...tags],
            soldCount: 0,
            rating: 0,
            variants: variants.map((vars) => {
              return {
                ...vars,
                images: vars.images,
                price: Number(vars.price),
                stock: Number(vars.stock),
                sku: `${vars.sku}-${productData.productName}-${productData.brand}`,
              };
            }),
          };

          const response = await createProduct(ProductDetails);

          if (!response.success) {
            toast.error(response.message);
            return;
          }
          toast.success(response.message, {
            style: {
              color: "green",
            },
          });
          setVariants([]);
          setUploadedImageUrls([]);
          setTags([]);
          await handleRecentProductList?.(1, 10, "");
          form.reset();
        }
      } catch (error) {
        console.log(axios.isAxiosError(error) ? error : "");
      }
    });
  };

  const handleEditSubmit = async (editedProduct: ProductSchemaType) => {
    const arcjetResponse = await createProductProtection();
    if (!arcjetResponse.success) {
      toast.error(arcjetResponse.message);
      console.log(arcjetResponse);
      return;
    }
    toast.success(arcjetResponse.message);
    console.log(arcjetResponse);

    if (
      variants.length > 0 &&
      tags.length > 0 &&
      productToBeEdit?.id &&
      arcjetResponse.success
    ) {
      const ProductDetails = {
        ...editedProduct,
        isFeatured: Boolean(isFeatured),
        tags: [...tags],
        soldCount: 0,
        rating: 0,
        variants: variants.map((vars) => {
          return {
            ...vars,
            images: vars.images,
            price: Number(vars.price),
            stock: Number(vars.stock),
            sku: `${vars.sku}-${editedProduct.productName}-${editedProduct.brand}`,
          };
        }),
      };

      const editResponse = await updateProductById({
        productData: ProductDetails,
        productId: productToBeEdit.id,
      });

      if (!editResponse.success) {
        toast.error(editResponse.message);
      }

      await fetchAllProduct({
        page: 1,
        limit: 20,
        dateString: "",
        searchString: "",
        tagString: "",
      });

      await handleRecentProductList?.(1, 10, "");
      toast.success(editResponse.message, {
        style: {
          color: "green",
        },
      });

      setEditDialogFlag?.(false);
    }
  };

  useEffect(() => {
    if (productToBeEdit) {
      form.reset({
        brand: productToBeEdit.brand,
        category: productToBeEdit.category,
        gender: productToBeEdit.gender,
        productName: productToBeEdit.productName,
        description: productToBeEdit.description,
        isFeatured: productToBeEdit.isFeatured,
        soldCount: productToBeEdit.soldCount,
      });
      setTags(productToBeEdit.tags);
      const vrs = productToBeEdit.variants.map((vars) => {
        return {
          ...vars,
          id: vars.id,
          price: String(vars.price),
          stock: String(vars.stock),
        };
      });
      setVariants(vrs);
    }
  }, [productToBeEdit, form]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={
            productToBeEdit
              ? form.handleSubmit(handleEditSubmit)
              : form.handleSubmit(handleProductSubmit)
          }
          id="product_form"
          className="w-full h-full border rounded-2xl shadow-xl drop-shadow-xl"
        >
          <div className="flex flex-col gap-4 px-4 py-2 md:py-2 lg:py-2 md:px-6 lg:px-8 ">
            {/* Header titile */}
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="flex items-center justify-center">
                {/* Icon */}
                <Sprout className="w-6 h-6 text-green-500" />
                <h1 className="text-xl md:text-3xl lg:text-3xl font-bold uppercase py-1 px-2 text-green-500">
                  {productToBeEdit ? "Edit Product" : "Add Product"}
                </h1>
              </div>
            </div>
            {/* Product Form */}
            <div
              className={`${
                uploadedImageUrls && uploadedImageUrls.length === 0 ? "" : ""
              }`}
            >
              {productFormData && productFormData.length > 0
                ? productFormData.map(
                    (menu: ProductFormFieldType, index: number) => {
                      return (
                        <CommonForm
                          key={`index-${index + 1}`}
                          form={form}
                          formData={menu}
                          {...(menu.name === "isFeatured" && {
                            setFeatured,
                          })}
                          {...(menu.name === "tags" && {
                            setTags,
                            tags,
                          })}
                        />
                      );
                    }
                  )
                : null}
            </div>
            {/* Variant Form */}
            <div className="flex gap-4 items-center w-full h-full">
              <Button
                key={"variant-form"}
                variant={"outline"}
                onClick={(event) => {
                  event.preventDefault();
                  setVariantDialogFlag(true);
                }}
                disabled={!form.formState.isValid}
                className="cursor-pointer scale-90 hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <Atom className="w-6 h-6" />
                <span>Add Variant</span>
              </Button>
              <div
                className={`${
                  variants.length === 0 ? "pointer-events-none opacity-50" : ""
                } w-full h-full`}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="flex items-center w-fit h-[30px] shrink"
                    >
                      <Eye /> Show Variants
                    </Button>
                  </DialogTrigger>
                  <VariantLists variant={variants} setVariants={setVariants} />
                </Dialog>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button
                variant={"outline"}
                type="submit"
                // form="product_form"
                disabled={!(form.formState.isValid && variants.length !== 0)}
                className="flex gap-6 cursor-pointer w-full h-full md:w-1/2 lg:w-full"
              >
                <ShoppingBasket className="w-6 h-6" />
                <span>{productToBeEdit ? "Update.." : "Create Product"}</span>
              </Button>
            </div>
          </div>
        </form>
        <Dialog open={variantDialogFlag} onOpenChange={setVariantDialogFlag}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="p-0">
            <DialogHeader className="flex flex-col gap-2 items-center justify-center">
              <DialogTitle className="text-xs md:text-3xl lg:text-3xl uppercase px-2 py-1 ">
                Add Variants
              </DialogTitle>
              <DialogDescription>
                You can add multiple variants to a single{" "}
                <span className="select-none cursor-pointer text-sm font-bold underline underline-offset-1">
                  Product
                </span>
              </DialogDescription>
              <div className="flex flex-col gap-4 items-center ">
                <AddVariantsOfProduct
                  setVariants={setVariants}
                  variants={variants}
                  setFilterSizeByColor={setFilterSizeByColor}
                  filterSizeByColor={filterSizeByColor}
                  setUploadedImageUrls={setUploadedImageUrls}
                  uploadedImageUrls={uploadedImageUrls}
                  isUploaded={isUploaded}
                  previewUrls={previewUrls}
                  setIsUploaded={setIsUploaded}
                  setPreviewUrls={setPreviewUrls}
                  setVariantDialogFlag={setVariantDialogFlag}
                />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Form>
    </div>
  );
};

export default CreateProductForm;
