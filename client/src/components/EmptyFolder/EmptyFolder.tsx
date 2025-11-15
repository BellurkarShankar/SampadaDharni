"use client";
import React, { SetStateAction } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PuffLoader } from "react-spinners";
import { Folders, PlusIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const EmptyFolder = ({
  setDateString,
  setSearchString,
  setTagString,
}: {
  setTagString?: React.Dispatch<SetStateAction<string>>;
  setDateString?: React.Dispatch<SetStateAction<string>>;
  setSearchString?: React.Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center w-full h-full row-span-2 col-span-8 ">
      <Empty>
        <EmptyHeader className="relative">
          <EmptyMedia
            variant="default"
            className="bg-amber-200 rounded-2xl px-4 py-2"
          >
            <Folders className="w-30 h-30 " />
            <PuffLoader
              size={30}
              color="indigo"
              className="absolute -top-2 -left-14  "
            />
          </EmptyMedia>

          <EmptyTitle>No data</EmptyTitle>
          <EmptyDescription className="flex gap-0.5 flex-col">
            <span>
              Product might be deleted or no matching products were found
            </span>
            <span>Please try different filters or keywords !</span>
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <div className="flex gap-4 items-center">
            <Button
              variant={"outline"}
              className="flex gap-2 items-center px-2 cursor-pointer bg-indigo-500 text-white hover:text-indigo-500 hover:border-indigo-500 hover:bg-indigo-100"
              onClick={() => router.push("add")}
            >
              <span>Add Product</span>
              <PlusIcon className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => {
                setTagString?.("");
                setDateString?.("");
                setSearchString?.("");
              }}
              className="cursor-pointer"
            >
              <span>Clear Filters</span>
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default EmptyFolder;
