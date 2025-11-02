import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ListOrdered,
  LogOut,
  Package,
  Printer,
  SendToBack,
  Settings,
  LogOutIcon,
  CopyPlus,
  HeartPlus,
  Puzzle,
} from "lucide-react";
import React from "react";

type IconHubType = {
  iconName: string;
  className?: string;
};

const icons = {
  ChevronLeft,
  ChevronRight,
  FileText,
  ListOrdered,
  LogOut,
  Package,
  Printer,
  SendToBack,
  Settings,
  LogOutIcon,
  CopyPlus,
  HeartPlus,
  Puzzle,
};

const IconHub = ({ className = "", iconName }: IconHubType) => {
  const IconComponent = icons[iconName as keyof typeof icons];
  return IconComponent ? <IconComponent className={className} /> : null;
};

export default IconHub;
