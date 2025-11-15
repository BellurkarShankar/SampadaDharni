"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PuffLoader } from "react-spinners";
import { productStore } from "@/store/productStore";
import {
  File,
  FileX,
  MessageCircle,
  MessageCircleX,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const Upload = ({
  setUploadedImageUrls,
  uploadedImageUrls,
  previewUrls,
  setPreviewUrls,
  isUploaded,
  setIsUploaded,
}: {
  setUploadedImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  uploadedImageUrls: string[];
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
  previewUrls: string[];
  isUploaded: boolean;
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [popUpFlag, setPopUpFlag] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const { uploadImages, isLoading } = productStore();

  const uploadToCloudinary = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const response = await uploadImages(formData);
        if (!response.success) {
          toast.error(response.message);
        }
        setUploadedImageUrls(response.data);
        setIsUploaded(false);
        toast.success(response.message);
      } catch (error) {
        toast.error("Upload Failed..");
      }
    });
  };

  const handleFileUpload = async (event: any) => {
    const files = event.target.files as File[];
    if (files && files.length <= 5) {
      setIsUploaded(true);
      setUploadedFiles(Array.from(files));
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("image", file);
      });
      uploadToCloudinary(formData);
    } else {
      setPopUpFlag(true);
      setUploadedImageUrls([]);
    }
  };

  const handleDraggedFiles = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDroppedFiles = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (!droppedFiles) return;
    if (droppedFiles.length <= 5) {
      const droppedUrls = droppedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls(droppedUrls);
      const formData = new FormData();
      droppedFiles.forEach((files) => {
        formData.append("image", files);
      });
      uploadToCloudinary(formData);
    } else {
      setPopUpFlag(true);
      setUploadedImageUrls([]);
    }
  };

  const removeFile = async (event: any) => {
    event.preventDefault();
    setUploadedImageUrls([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 items-center justify-center  rounded-2xl text-green-500  w-32 h-20 md:w-120 md:h-40 lg:w-120 lg:h-40 ${
        uploadedImageUrls.length === 0
          ? "border-2 border-dashed"
          : "border-4 hover:border-orange-400/30"
      } `}
      onDrop={handleDroppedFiles}
      onDragOver={handleDraggedFiles}
    >
      <Input
        type="file"
        id="images"
        ref={inputRef}
        multiple
        className="hidden w-120 "
        onChange={(event) => handleFileUpload(event)}
      />
      {isUploaded ? (
        <PuffLoader color="orange" size={120} />
      ) : uploadedImageUrls && uploadedImageUrls.length === 0 ? (
        <Label
          htmlFor="images"
          className="flex flex-col gap-2 mt-4 w-full h-full py-4 text-green-500 cursor-pointer"
        >
          <UploadCloudIcon className="w-10 h-10 md:w-60 md:h-20 lg:h-20 lg:w-60" />
          Upload Image
        </Label>
      ) : uploadedImageUrls && uploadedImageUrls.length > 0 ? (
        <div className="flex gap-0.5 items-center overflow-hidden">
          <div className="hidden md:flex lg:flex gap-2 hover:text-red-400 md:overflow-auto [&::-webkit-scrollbar-track]:mx-3 [&::-webkit-scrollbar]:mt-2  [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:h-[12px] [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar]:w-[40px] [&::-webkit-scrollbar]:h-[6px]">
            {previewUrls && previewUrls.length > 0
              ? previewUrls.map((fl, ind) => {
                  return (
                    <Image
                      key={ind}
                      src={fl}
                      alt=""
                      width={60}
                      height={40}
                      className="rounded-xl drop-shadow-xl px-2 py-2  "
                    />
                  );
                })
              : null}
          </div>
          <div className="flex gap-1 items-center md:hidden lg:hidden ">
            <File className="w-5 h-5 " />
            <div className="flex flex-col gap-0.5 items-center overflow-hidden">
              {uploadedFiles?.map((files, ind) => {
                return (
                  <span key={files.name} className="w-10 truncate text-xs ">
                    {files.name}
                  </span>
                );
              })}
            </div>
          </div>
          <Button
            onClick={removeFile}
            className="group felx items-center justify-center cursor-pointer w-5 h-5 md:w-20 md:h-7 md:ml-2 lg:w-20 lg:h-7 lg:ml-2 hover:bg-red-400/80 hover:text-white"
            variant={"outline"}
          >
            <XIcon className="w-4 h-4 text-red-900" />
            <span className="hidden md:block lg:block">Clear</span>
          </Button>
        </div>
      ) : null}
      <Dialog open={popUpFlag} onOpenChange={setPopUpFlag}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center justify-center">
            <DialogTitle className="flex gap-2">
              <span className="text-red-500 text-xl capitalize">
                More than 5 Files selected
              </span>
              <MessageCircleX className="text-red-500" />
            </DialogTitle>
            <DialogDescription className="text-green-500">
              You can select a maximum of 5 files at a time.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center ">
            <Button
              variant={"destructive"}
              className="w-1/2 cursor-pointer scale-90 hover:scale-110 hover:border-1 hover:border-red-500 hover:bg-white hover:text-red-500"
              onClick={() => {
                setUploadedImageUrls([]);
                setPopUpFlag(false);
              }}
            >
              Clear
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Upload;
