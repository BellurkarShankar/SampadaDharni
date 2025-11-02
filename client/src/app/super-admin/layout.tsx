"use client";
import SidebarFooterSection from "@/components/common-sidebar/SidebarFooterSection";
import SidebarHeaderSection from "@/components/common-sidebar/SidebarHeaderSection";
import SidebarMenuSection from "@/components/common-sidebar/SidebarMenuSection";
import { Card } from "@/components/ui/card";
import useAuthStore from "@/store/useAuthStore";
import { superadminSidebarMenuItem } from "@/utils/menuItems";
import React, { useState } from "react";

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuthStore();
  const [isSidebarOpen, setSidebarOpenClose] = useState(true);
  return (
    <section className="flex min-h-screen max-w-screen">
      <aside
        className={`h-screen border-r px-4 py-2 ${
          isSidebarOpen ? "w-64" : "w-16"
        } `}
      >
        <Card className="flex flex-col border-none gap-4 rounded-none shadow-none  pl-0 pr-0">
          <SidebarHeaderSection
            isSidebarOpen={isSidebarOpen}
            setSidebarOpenClose={setSidebarOpenClose}
          />
          <SidebarMenuSection
            isSidebarOpen={isSidebarOpen}
            menuItem={superadminSidebarMenuItem}
          />
          <SidebarFooterSection isSidebarOpen={isSidebarOpen} logout={logout} />
        </Card>
      </aside>
      <main>{children}</main>
    </section>
  );
};

export default SuperAdminLayout;
