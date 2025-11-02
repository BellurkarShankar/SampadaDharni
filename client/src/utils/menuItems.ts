import { Package } from "lucide-react";

export type MenuItemType = {
  menuLabel: string;
  menuIcon: string;
  menuHref: string;
};
export const superadminSidebarMenuItem: MenuItemType[] = [
  {
    menuLabel: "Product",
    menuIcon: "Package",
    menuHref: "/super-admin/product/list",
  },
  {
    menuLabel: "Add New Product",
    menuIcon: "CopyPlus",
    menuHref: "/super-admin/product/add",
  },
  {
    menuLabel: "Orders",
    menuIcon: "SendToBack",
    menuHref: "/super-admin/orders",
  },
  {
    menuLabel: "Coupons",
    menuIcon: "Puzzle",
    menuHref: "/super-admin/coupons/list",
  },
  {
    menuLabel: "Create Coupon",
    menuIcon: "HeartPlus",
    menuHref: "/super-admin/coupons/add",
  },
  {
    menuLabel: "Settings",
    menuIcon: "Settings",
    menuHref: "/super-admin/settings",
  },
];
