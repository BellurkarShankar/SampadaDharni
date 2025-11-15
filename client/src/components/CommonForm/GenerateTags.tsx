"use client";
import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import TagsGenerator from "./TagsGenerator";
import { toast } from "sonner";
import { Tag } from "lucide-react";

const GenerateTags = ({
  tags,
  setTags,
}: {
  tags?: string[];
  setTags?: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [inputTag, setInputTag] = useState<string>("");
  const inpTagRef = useRef<HTMLInputElement>(null);
  const [dialogFlag, setDialogFlag] = useState<boolean>(false);
  const handleAddTag = (event: any) => {
    event.preventDefault();
    const input = inputTag.trim().toLowerCase();
    if (!inputTag) {
      inpTagRef.current?.focus();
      toast.error("Enter tag name Please !", {
        position: "top-center",
        style: {
          color: "red",
        },
      });
      return;
    }
    if (tags?.includes(input)) {
      setInputTag("");
      setDialogFlag(true);
      return;
    }
    setTags?.((prev) => (prev.includes(input) ? [...prev] : [...prev, input]));
    setInputTag("");
  };
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="flex gap-0">
        <Input
          type="text"
          ref={inpTagRef}
          onChange={(event) => setInputTag(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && handleAddTag(event)}
          value={inputTag}
          className="px-2 rounded-tl-xl rounded-bl-xl rounded-tr-none rounded-br-none focus-visible:border-1 focus-visible:ring-0"
          placeholder="Enter tagname and add"
        />

        <Button
          variant="outline"
          onClick={handleAddTag}
          className="border-green-300 rounded-tr-2xl rounded-br-2xl rounded-tl-none rounded-bl-none hover:*:[svg]:fill-green-500 hover:bg-green-100/30 cursor-pointer "
        >
          <Tag className="w-6 h-6 text-green-500" />
          <span className="text-green-500">Add Tag</span>
        </Button>
      </div>
      <div>
        {tags && setTags && (
          <TagsGenerator
            dialogFlag={dialogFlag}
            setDialogFlag={setDialogFlag}
            setTags={setTags}
            tags={tags}
          />
        )}
      </div>
    </div>
  );
};

export default GenerateTags;
