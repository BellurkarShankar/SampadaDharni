"use client";
import React from "react";
import {
  colors,
  ColorsAsPerCode,
  VariantSchemaType,
} from "../schemaValidationAndFormData/productSchema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
const VariantLists = ({
  variant,
  setVariants,
}: {
  variant: VariantSchemaType[];
  setVariants: React.Dispatch<React.SetStateAction<VariantSchemaType[]>>;
}) => {
  const handleDiscardVariant = (sku: string) => {
    setVariants((prev) => prev.filter((vars) => vars.sku !== sku));
  };

  return (
    <DialogContent className="w-full h-fit">
      <DialogHeader className="flex gap-1 items-center justify-center">
        <DialogTitle>Added Variants</DialogTitle>
        <DialogDescription>Products has these variants </DialogDescription>
      </DialogHeader>
      <Card className="min-w-full h-full border-none shadow-xl drop-shadow-xl p-0">
        <CardContent className="px-0">
          <Carousel>
            <CarouselContent>
              {variant.map((data, index) => {
                const varNumber = String(index + 1).padStart(2, "0");
                return (
                  <CarouselItem key={index}>
                    <Card>
                      <CardHeader className="flex flex-col items-center justify-center">
                        <CardTitle>{varNumber}</CardTitle>
                        <CardDescription>Product Variants</CardDescription>
                      </CardHeader>
                      <CardContent className="shadow-xl drop-shadow-xl rounded-2xl px-0 mx-4 cursor-grab">
                        <Carousel>
                          <CarouselContent>
                            {data.images?.map((imgs, index) => {
                              return (
                                <CarouselItem key={`${index}-img`}>
                                  <div className="flex items-center justify-center">
                                    <img
                                      src={imgs}
                                      alt={`imgs-${index}`}
                                      className="w-full h-[400px] object-fill rounded-2xl"
                                    />
                                  </div>
                                </CarouselItem>
                              );
                            })}
                          </CarouselContent>
                          <CarouselPrevious className="top-90 left-8 scale-110 hover:scale-140" />
                          <CarouselNext className="top-90 right-8 scale-110 hover:scale-140" />
                        </Carousel>
                      </CardContent>
                      <CardFooter className="flex items-center justify-center">
                        <Button
                          variant={"outline"}
                          className="flex gap-4 items-center w-3/4 cursor-pointer hover:*:[svg]:fill-red-500 border-red-500 hover:bg-red-200 "
                          onClick={() =>
                            data.sku && handleDiscardVariant(data.sku)
                          }
                        >
                          <Trash2 className="w-6 h-6 text-red-500" />
                          <span className="text-red-500 ">Discard</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-16 scale-110 hover:scale-140" />
            <CarouselNext className="-right-16 scale-110 hover:scale-140 " />
          </Carousel>
        </CardContent>
      </Card>
    </DialogContent>
  );
};

export default VariantLists;
