"use client";
import React from "react";
import { Badge } from "../ui/badge";
import { Tag, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
const TagsGenerator = ({
  tags,
  setTags,
  dialogFlag,
  setDialogFlag,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  dialogFlag: boolean;
  setDialogFlag: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="group flex items-center w-full h-full">
      <div
        className="flex gap-2 items-center min-w-full px-2 py-1 overflow-x-scroll overflow-y-hidden
      [&::-webkit-scrollbar-thumb]:h-[12px] [&::-webkit-scrollbar]:w-[10px] [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:bg-background [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-2xl [&::-webkit-scrollbar-thumb]:mx-2 [&::-webkit-scrollbar-thumb]:hidden group-hover:[&::-webkit-scrollbar-thumb]:block
      "
      >
        {tags && tags.length > 0
          ? tags.map((tag, ind) => {
              return (
                <div key={tag} className="flex items-center">
                  <Badge
                    variant={"outline"}
                    className="flex gap-0.5 items-center border-green-300 text-green-500 rounded-tl-xl rounded-bl-xl rounded-tr-none rounded-br-none w-fit h-5 px-1 py-1 cursor-pointer scale-95 md:hover:scale-100 lg:hover:scale-100 transition-all duration-200 ease-in-out hover:*:[svg]:fill-green-500 hover:bg-green-100/30"
                  >
                    <Tag className="w-4 h-4" />
                    <span>{tag}</span>
                  </Badge>
                  <X
                    className="border-red-300 text-red-500 border rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl -top-1/5 right-0.5 w-4 h-6 cursor-pointer lg:hover:scale-120 md:hover:scale-100 transition-all duration-200 ease-in-out"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setTags((prev) => prev.filter((tg) => tg !== tag));
                    }}
                  />
                </div>
              );
            })
          : null}
      </div>
      <Dialog open={dialogFlag} onOpenChange={setDialogFlag}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle className="px-2 text-2xl text-red-600">
              ✋ Oopps !
            </DialogTitle>
            <DialogDescription>
              The tag you entered is already present! Please try a different one
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {tags && tags.length > 0
              ? tags.map((tag, ind) => {
                  return (
                    <div key={tag} className="flex gap-0.5 items-center">
                      <Badge
                        variant={"outline"}
                        className=" rounded-tl-xl rounded-bl-xl rounded-tr-none rounded-br-none w-fit h-fit px-4 py-1 cursor-pointer hover:border-green-500/80 lg:hover:scale-110 md:hover:scale-100 transition-all duration-200 ease-in-out overflow-visible"
                      >
                        {tag}
                      </Badge>
                      <X
                        className="text-red-500 border rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl -top-1/5 right-0.5 w-4 h-6 cursor-pointer hover:border-red-500/80 lg:hover:scale-120 md:hover:scale-100 transition-all duration-200 ease-in-out"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setTags((prev) => prev.filter((tg) => tg !== tag));
                        }}
                      />
                    </div>
                  );
                })
              : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TagsGenerator;
