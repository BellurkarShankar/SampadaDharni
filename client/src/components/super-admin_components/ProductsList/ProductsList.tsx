"use client";
import { productStore } from "@/store/productStore";
import React, { useEffect, useState, useTransition } from "react";
import ProductTile from "../Product Tile/ProductTile";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusIcon, SearchIcon, TextCursorInput, XIcon } from "lucide-react";
import FilterComponent from "@/components/Filter Component/FilterComponent";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import EmptyFolder from "@/components/EmptyFolder/EmptyFolder";

const ProductsList = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { fetchAllProduct, products } = productStore();
  const [page, setPage] = useState<number>(1);
  const [dateString, setDateString] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [noOfProducts, setNoOfProducts] = useState<number>(0);
  const [tagString, setTagString] = useState<string>("");

  const rowsPerPage = 20;
  const getAllProducts = async (
    page: number,
    rowsPerPage: number,
    dateString: string,
    searchString: string,
    tagString: string
  ) => {
    try {
      const response = await fetchAllProduct({
        page,
        limit: rowsPerPage,
        dateString,
        searchString,
        tagString,
      });
      if (!response.success) {
        console.log(response.message);
      }
      console.log(response.counters?.noOfProducts);
      setNoOfProducts(response.counters?.noOfProducts || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts(page, rowsPerPage, dateString, searchString, tagString);
  }, [page, dateString, searchString, tagString]);

  const [_a, _b, routeName, pageName] = pathName.split("/");

  const totalPages = Math.ceil(noOfProducts / rowsPerPage);

  return (
    <div className="flex gap-1 flex-col">
      {/* Header */}
      <header className="hidden sm:flex lg:flex md:flex items-center justify-between px-2 py-2">
        <div className="flex gap-1 items-center select-none pl-2">
          <TextCursorInput className="w-6 h-6 px-1" />
          <span className="text-muted-foreground capitalize">{routeName}</span>/
          <span className="text-muted-foreground capitalize">{pageName}</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center px-4">
            <Input
              type="search"
              onChange={(event) => setSearchString(event.target.value)}
              placeholder="Enter product name..."
              className={`relative group rounded-tr-none rounded-br-none focus-visible:border-1 focus-visible:ring-0 lg:w-[400px] ${
                searchString === "" ? "pl-6 " : ""
              }`}
            />
            <Badge
              variant={"outline"}
              className="w-8 h-9 rounded-bl-none rounded-tl-none"
            >
              <SearchIcon className="w-8 h-9" />
            </Badge>
            <SearchIcon
              className={`absolute w-6 h-4 px-1 ${
                searchString !== "" ? "hidden" : "text-muted-foreground"
              }`}
            />
          </div>
          <div>
            <FilterComponent
              page={page}
              setPage={setPage}
              dateString=""
              setDateString={setDateString}
              totalPages={totalPages}
            />
          </div>
          <Button
            variant={"secondary"}
            className="flex gap-4 items-center px-6 cursor-pointer capitalize"
            onClick={() => router.push("add")}
          >
            <PlusIcon className="w-6 h-6" />
            <span>Add Product</span>
          </Button>
        </div>
      </header>

      {/* Tags */}
      <div className="flex gap-2 items-center px-3 w-full overflow-x-auto py-1">
        {tagString && (
          <Button
            variant={"outline"}
            className="flex items-center px-4 w-fit h-fit py-0.25 bg-rose-200 text-red-500 hover:text-red-500 hover:border-red-500 hover:bg-red-100"
            onClick={() => setTagString("")}
          >
            <span>Clear</span>{" "}
            <XIcon className="w-4 h-4 scale-90 hover:scale-110 transition-all duration-300 ease-in-out" />
          </Button>
        )}
        <Badge
          variant={"default"}
          className={`px-6 bg-gray-500 cursor-pointer ${
            tagString || products.length === 0 ? "hidden" : ""
          }`}
        >
          All
        </Badge>
        {products && products.length > 0
          ? products.map((product) =>
              product.tags.map((tag) => {
                return (
                  <Badge
                    key={tag}
                    variant={"secondary"}
                    className="cursor-pointer"
                    onClick={() => setTagString(tag)}
                  >
                    {tag}
                  </Badge>
                );
              })
            )
          : null}
      </div>

      {/* Product List */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-6 px-6 py-8">
        {products && products.length > 0 ? (
          products.map((prodct) => {
            return <ProductTile key={prodct.id} product={prodct} />;
          })
        ) : (
          <EmptyFolder
            setDateString={setDateString}
            setSearchString={setSearchString}
            setTagString={setTagString}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsList;
