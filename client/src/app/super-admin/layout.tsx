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
        className={`hidden fixed z-40 min-h-screen border-r px-4 py-2 bg-background ${
          isSidebarOpen ? "md:w-64 lg:w-64" : "w-16"
        } md:block lg:block`}
      >
        <Card className="flex flex-col border-none gap-4 rounded-none shadow-none pl-0 pr-0 w-full h-full">
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
      <main
        className={`${
          isSidebarOpen ? "md:ml-64 lg:ml-64 z-10" : "ml-16"
        } h-full w-full`}
      >
        {children}
      </main>
    </section>
  );
};

export default SuperAdminLayout;
