"use client";
import React from "react";
import { CardContent } from "../ui/card";
import { MenuItemType } from "@/utils/menuItems";
import Link from "next/link";
import IconHub from "./IconHub";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

const SidebarMenuSection = ({
  menuItem,
  isSidebarOpen,
}: {
  isSidebarOpen: boolean;
  menuItem: MenuItemType[];
}) => {
  const router = useRouter();
  const pathName = usePathname();
  // console.log(pathName);

  return (
    <CardContent
      className={`relative flex flex-col  space-y-1  ${
        isSidebarOpen
          ? "gap-4 py-4 mt-8 border-none rounded-none shadow-none"
          : "gap-6 pr-0 pl-0 mt-10"
      }`}
    >
      {menuItem && menuItem.length > 0
        ? menuItem.map((menu: MenuItemType, index: number) => {
            // console.log(menu.menuHref);
            return (
              <div
                key={menu.menuLabel + index}
                className={`group flex gap-4 items-center ${
                  pathName === menu.menuHref
                    ? "bg-accent text-accent-foreground rounded-xl"
                    : ""
                }  ${
                  isSidebarOpen
                    ? "px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    : "w-6 h-6 cursor-pointer"
                }`}
                onClick={() => {
                  if (!isSidebarOpen) router.push(menu.menuHref);
                }}
              >
                <IconHub
                  iconName={menu.menuIcon}
                  className={`${
                    isSidebarOpen
                      ? "w-4 h-4"
                      : !isSidebarOpen && menu.menuIcon === "HeartPlus"
                      ? "w-6 h-5 text-red-500"
                      : "w-6 h-5"
                  }`}
                />
                <span
                  className={`hidden absolute ml-8 w-32 group-hover:block ${
                    isSidebarOpen ? "hidden" : ""
                  }`}
                >
                  <Badge
                    variant={"outline"}
                    className={`bg-background scale-80 animate-out zoom-out-95 group-hover:slide-in-from-left-2 group-hover:animate-in group-hover:zoom-in-95 group-hover:-translate-y-1 group-hover:scale-110 ${
                      isSidebarOpen ? "hidden" : ""
                    }`}
                  >
                    {menu.menuLabel}
                  </Badge>
                </span>

                <Link
                  href={menu.menuHref}
                  onClick={(e) => e.stopPropagation()}
                  className={`${!isSidebarOpen ? "hidden" : ""} `}
                >
                  {menu.menuLabel}
                </Link>
              </div>
            );
          })
        : null}
    </CardContent>
  );
};

export default SidebarMenuSection;
