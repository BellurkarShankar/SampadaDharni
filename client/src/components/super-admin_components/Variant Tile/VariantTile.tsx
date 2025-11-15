"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Variant } from "@/utils/productTypes";
import React from "react";
import { ColorsAsPerCode } from "../schemaValidationAndFormData/productSchema";
import { IndianRupee } from "lucide-react";

const VariantTile = ({ variant }: { variant: Variant }) => {
  return (
    <Card className="py-0 border-none shadow-none rounded-2xl">
      <CardContent className="rounded-2xl shadow-sm drop-shadow-xl py-0 px-0 mx-2">
        <Carousel>
          <CarouselContent>
            {variant.images.map((vr, ind) => {
              return (
                <CarouselItem key={`${ind}-varImg`}>
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src={vr}
                      alt={`img-${ind}`}
                      className="object-fill w-full h-[300px] rounded-2xl"
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {variant.images.length > 1 ? (
            <>
              <CarouselPrevious className="left-4 top-70 scale-100 hover:scale-120" />
              <CarouselNext className="right-4 top-70 scale-100 hover:scale-120" />
            </>
          ) : null}
        </Carousel>
      </CardContent>
      <div className="grid grid-cols-1 gap-2 items-center justify-center">
        <div
          className={`flex items-center justify-center gap-1 bg-amber-200 rounded-xl px-1 mx-6`}
        >
          <Badge variant={"outline"}>Price</Badge>
          <span className="flex items-center">
            <IndianRupee className="w-3 h-3" />
            {variant.price}
          </span>
        </div>
        <div className="flex items-center justify-evenly gap-1">
          <div className={`flex items-center justify-center gap-2 px-1 py-1`}>
            <Badge variant={"outline"} className="px-4 py-1 ">
              Color
            </Badge>
            <span
              className={`flex w-6 h-6 items-center justify-center rounded-full px-1 py-0.5 select-none hover:scale-110 transition-all duration-300 ease-in-out border ring-1 ring-offset-1 ${
                variant.color === "White" ? "border-1 text-xs px-1 py-0.5" : ""
              } ${ColorsAsPerCode[variant.color]}`}
            >
              {variant.color[0]}
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Badge variant={"outline"} className="px-4 py-1">
              Size {variant.size}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VariantTile;
