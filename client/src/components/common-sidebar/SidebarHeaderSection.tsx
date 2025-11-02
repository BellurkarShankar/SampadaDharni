"use client";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const SidebarHeaderSection = ({
  setSidebarOpenClose,
  isSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setSidebarOpenClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="relative flex gap-2 items-center">
      <Leaf
        className={`${
          isSidebarOpen ? "w-6 h-6 " : "w-6 h-6"
        }  text-green-900 bg-green-400 rounded-full p-1`}
      />{" "}
      <span
        className={`text-green-500 text-center text-2xl font-bold ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        SampdaDharni
      </span>
      <Button
        variant={"outline"}
        className="absolute -right-7 rounded-full w-6 h-6"
        onClick={() => setSidebarOpenClose((prev) => !prev)}
      >
        {!isSidebarOpen ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};

export default SidebarHeaderSection;
