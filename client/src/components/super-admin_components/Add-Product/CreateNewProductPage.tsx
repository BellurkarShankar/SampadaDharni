"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
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
import Upload from "../ImageUpload/Upload";
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
import { Badge } from "@/components/ui/badge";
import { Atom, Eye, ShoppingBasket } from "lucide-react";
import axios from "axios";
import RecentProductList from "../RecentProductList/RecentProductList";
import { RecentProductsType } from "@/utils/productTypes";
import CreateProductForm from "../Create Product Form/CreateProductForm";

const CreateNewProductPage = () => {
  const { fetchRecentProductList, isLoading } = productStore();

  const [page, setPage] = useState<number>(1);
  const [dateString, setDateString] = useState<string>("");
  const rowsPerPage = 10;
  const [recentProducts, setRecentProducts] = useState<RecentProductsType[]>(
    []
  );
  const [noOfRecentProducts, setNoOfRecentProducts] = useState<number>(0);
  const handleRecentProductList = async (
    page: number,
    rowsPerPage: number,
    dateString: string
  ) => {
    console.log("Called");

    try {
      const res = await fetchRecentProductList(page, rowsPerPage, dateString);
      if (!res.success) {
        console.log(res.message);
        setRecentProducts([]);
        setNoOfRecentProducts(res.counters?.noOfRecentProducts || 0);
        return;
      }
      console.log(res.data, res.counters?.noOfRecentProducts);
      setRecentProducts(res.data);
      setNoOfRecentProducts(res.counters?.noOfRecentProducts || 0);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleRecentProductList(page, rowsPerPage, dateString);
  }, [page, dateString]);
  const totalPages = Math.ceil(noOfRecentProducts / rowsPerPage);
  return (
    <div className="grid grid-cols-1 gap-4 px-6 py-8 md:grid-cols-1 lg:grid-cols-2">
      <CreateProductForm handleRecentProductList={handleRecentProductList} />
      <div className="hidden md:hidden lg:block w-full h-[700px] ">
        <RecentProductList
          noOfRecentProducts={noOfRecentProducts}
          page={page}
          recentProducts={recentProducts}
          setNoOfRecentProducts={setNoOfRecentProducts}
          setPage={setPage}
          handleRecentProductList={handleRecentProductList}
          dateString={dateString}
          setDateString={setDateString}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default CreateNewProductPage;
