"use client";

import { productStore } from "@/store/productStore";
import { RecentProductsType } from "@/utils/productTypes";
import React, { SetStateAction, useEffect, useState } from "react";
import ProductTile from "../Product Tile/ProductTile";
import FilterComponent from "@/components/Filter Component/FilterComponent";
import EmptyFolder from "@/components/EmptyFolder/EmptyFolder";
type RecentProductListType = {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  recentProducts: RecentProductsType[];
  noOfRecentProducts: number;
  setNoOfRecentProducts: React.Dispatch<SetStateAction<number>>;
  handleRecentProductList?: (
    page: number,
    limit: number,
    dateString: string
  ) => Promise<void>;
  dateString: string;
  setDateString: React.Dispatch<SetStateAction<string>>;
  totalPages: number;
};
const RecentProductList = ({
  page,
  recentProducts,
  setPage,
  handleRecentProductList,
  dateString,
  setDateString,
  totalPages,
}: RecentProductListType) => {
  return (
    <div
      className="flex flex-col gap-4 border rounded-2xl px-4 py-4 shadow-xl drop-shadow-xl w-full h-full overflow-x-hidden overflow-y-auto 
     [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-gray-600/50 [&::-webkit-scrollbar-thumb]:hover:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-2xl [&::-webkit-scrollbar-track]:my-3 transition-all duration-300 ease-in-out
    "
    >
      {/* Header Title */}
      <div className="flex items-center justify-center ">
        <h1 className="font-bold uppercase text-2xl text-cyan-700 text-shadow-primary-foreground">
          Recent Product List
        </h1>
      </div>

      {/* Filter Section */}
      <FilterComponent
        page={page}
        setPage={setPage}
        dateString={dateString}
        setDateString={setDateString}
        totalPages={totalPages}
      />

      {/* Recent Products List */}
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 w-full max-h-full ">
        {recentProducts && recentProducts.length > 0 ? (
          recentProducts.map((product, index) => {
            return (
              <ProductTile
                key={product.id}
                product={product}
                handleRecentProductList={handleRecentProductList}
              />
            );
          })
        ) : (
          <EmptyFolder setDateString={setDateString} />
        )}
      </div>
    </div>
  );
};

export default RecentProductList;
