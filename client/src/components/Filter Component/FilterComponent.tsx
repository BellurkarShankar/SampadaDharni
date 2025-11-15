"use client";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  ShuffleIcon,
  XIcon,
} from "lucide-react";
import React, { SetStateAction, useState } from "react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
type FilterComponentType = {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  dateString: string;
  setDateString: React.Dispatch<SetStateAction<string>>;
  totalPages: number;
};
const FilterComponent = ({
  page,
  setPage,
  dateString,
  setDateString,
  totalPages,
}: FilterComponentType) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [popoverFlag, setPopoverFlag] = useState<boolean>(false);
  return (
    <div className="my-2">
      <div className="flex gap-2 items-center justify-between px-2 py-1">
        <div className="flex gap-1 items-center">
          <CalendarDays className="w-9 h-9 shadow-xl border rounded-full px-2 py-1 cursor-no-drop" />
          <Popover open={popoverFlag} onOpenChange={setPopoverFlag}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={() => setPopoverFlag(true)}
              >
                {date
                  ? date.toLocaleDateString("en-us", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      formatMatcher: "best fit",
                    })
                  : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="p-0 rounded-2xl my-1">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(dt) => {
                  setDate(dt);
                  dt && setDateString(dt.toLocaleDateString());
                  setPopoverFlag(false);
                }}
                className="rounded-2xl shadow border w-full h-full"
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>

          <div className="relative group">
            <Button
              variant={"outline"}
              size={"icon"}
              className="flex items-center cursor-pointer hover:text-red-500 hover:border-red-500 hover:bg-red-100"
              onClick={() => {
                setDateString("");
                setDate(new Date());
              }}
            >
              <RefreshCcw className="w-4 h-4 scale-90 hover:scale-110 transition-all duration-300 ease-in-out" />
            </Button>
            <Badge
              variant={"secondary"}
              className="absolute hidden -top-4 w-fit group-hover:slide-in-from-left-4 animate-out zoom-out
              group-hover:block group-hover:animate-in group-hover:zoom-in-95"
            >
              Clear Date
            </Badge>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Badge variant={"secondary"} className="rounded-sm">
            <span>Page :</span>
          </Badge>
          <div className="flex gap-2 items-center ">
            <Button
              variant={"outline"}
              className="w-6 h-6 rounded-sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <span>{page}</span>
            <span>of</span>
            <span>{totalPages === 0 ? "1" : totalPages}</span>
            <Button
              variant={"outline"}
              className="w-6 h-6 rounded-sm"
              onClick={() => setPage(page + 1)}
              disabled={totalPages > 1 ? page === totalPages : true}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
