"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RecentProductsType } from "@/utils/productTypes";
import VariantTile from "../Variant Tile/VariantTile";
import { Badge } from "@/components/ui/badge";
import {
  ChartNoAxesGantt,
  ChevronRight,
  Layers2,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { productStore } from "@/store/productStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProductForm from "../Create Product Form/CreateProductForm";
const ProductTile = ({
  product,
  handleRecentProductList,
}: {
  product: RecentProductsType;
  handleRecentProductList?: (
    page: number,
    limit: number,
    dateString: string
  ) => Promise<void>;
}) => {
  const { deleteProductById, fetchAllProduct, isLoading } = productStore();
  const router = useRouter();
  const [editDialogFlag, setEditDialogFlag] = useState<boolean>(false);
  const handleDelete = async (productId: string) => {
    try {
      const response = await deleteProductById(productId);
      if (!response.success) {
        toast.error(response.message);
      }
      console.log(response.data);
      await fetchAllProduct({
        page: 1,
        limit: 20,
        dateString: "",
        searchString: "",
        tagString: "",
      });
      await handleRecentProductList?.(1, 10, "");
      toast.success(response.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (productToEdit: RecentProductsType) => {
    setEditDialogFlag(true);
    console.log(productToEdit, "productToEdit");
  };
  return (
    <Card className="relative py-2 rounded-2xl ring-1 ring-indigo-50">
      <CardContent className="px-0 ">
        {/* Variants Section */}
        <Carousel>
          <CarouselContent>
            {product.variants && product.variants.length > 0
              ? product.variants.map((vars) => {
                  return (
                    <CarouselItem key={vars.id}>
                      <VariantTile variant={vars} />
                    </CarouselItem>
                  );
                })
              : null}
          </CarouselContent>
          <div className="relative flex items-center px-2 min-w-full py-2 mt-2">
            <Badge
              variant={"destructive"}
              className="bg-indigo-200 text-indigo-900 select-none"
            >
              Variants <ChevronRight className="w-5 h-5" />
            </Badge>
            <div className="flex min-w-0">
              <CarouselPrevious className="left-42 " />
              <CarouselNext className="right-4" />
            </div>
          </div>
        </Carousel>

        {/* Product Description */}
        <div className="flex flex-col gap-4 px-2 py-2 w-full">
          <span className="text-sm text-card-foreground truncate">
            {product.productName}
          </span>
          <div className="flex items-center justify-between px-2">
            <Badge
              variant={"outline"}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Layers2 className="w-4 h-4" />
              <span>{product.category.toLocaleUpperCase()}</span>
            </Badge>
            <Badge
              variant={"outline"}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <ChartNoAxesGantt className="w-4 h-4" />

              <span>{product.brand.toLocaleUpperCase()}</span>
            </Badge>
          </div>
        </div>
      </CardContent>

      {/* Edit and Delete Section */}
      <div className="absolute -top-3  right-4 flex items-center justify-between gap-1">
        <Button
          variant={"outline"}
          className="group w-6 h-6 hover:*:[svg]:fill-cyan-500 cursor-pointer bg-teal-200 border-teal-500 text-teal-500 rounded-sm group"
          onClick={(event) => {
            event.preventDefault();
            handleEdit(product);
          }}
        >
          <Pencil className="scale-80 group-hover:scale-105 transition-all duration-300 ease-in-out" />
        </Button>
        <Button
          variant={"outline"}
          className="group w-6 h-6 hover:*:[svg]:fill-red-500 cursor-pointer bg-red-200 border-red-500 text-red-500 rounded-sm "
          onClick={() => handleDelete(product.id)}
        >
          <Trash2 className="scale-80 group-hover:scale-105 transition-all duration-300 ease-in-out" />
        </Button>
      </div>

      {/* Edit Dialog  */}
      <Dialog open={editDialogFlag} onOpenChange={setEditDialogFlag}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="overflow-y-auto h-[90%] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-gray-600/50 [&::-webkit-scrollbar-thumb]:hover:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-2xl [&::-webkit-scrollbar-track]:my-3 transition-all duration-300 ease-in-out">
          <DialogHeader className="flex items-center justify-between">
            <DialogTitle>Edit Page</DialogTitle>
            <DialogDescription>Edit Page</DialogDescription>
          </DialogHeader>
          <div className="h-3/4 mb-8">
            <CreateProductForm
              productToBeEdit={product}
              handleRecentProductList={handleRecentProductList}
              setEditDialogFlag={setEditDialogFlag}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProductTile;
