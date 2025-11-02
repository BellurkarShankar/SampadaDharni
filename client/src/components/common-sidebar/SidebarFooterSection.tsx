"use client";
import React from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import IconHub from "./IconHub";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

const SidebarFooterSection = ({
  logout,
  isSidebarOpen,
}: {
  logout: any;
  isSidebarOpen: boolean;
}) => {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await logout();
    if (!response.success) {
      toast.error(response.message);
    }
    toast.success(response.message);
    router.push("/auth");
  };
  return (
    <CardFooter className="relative group flex items-center justify-center pl-0 pr-0 mt-22">
      <Button
        variant={"secondary"}
        className={` ${
          isSidebarOpen
            ? "cursor-pointer p-2 w-52"
            : "w-6 h-6 cursor-pointer p-1"
        }`}
        onClick={handleLogout}
      >
        <IconHub iconName="LogOutIcon" className="w-4 h-4" />
        <span className={`${isSidebarOpen ? "" : "hidden"}`}>Logout</span>
      </Button>
      <span
        className={`absolute -right-33 w-32 hidden group-hover:block ${
          isSidebarOpen ? "hidden" : ""
        }`}
      >
        <Badge
          variant={"outline"}
          className={`scale-80 group-hover:slide-in-from-left-2 group-hover:animate-in group-hover:zoom-in-95 group-hover:-translate-y-1 group-hover:scale-110 ${
            isSidebarOpen ? "hidden" : ""
          }`}
        >
          Logout
        </Badge>
      </span>
    </CardFooter>
  );
};

export default SidebarFooterSection;
