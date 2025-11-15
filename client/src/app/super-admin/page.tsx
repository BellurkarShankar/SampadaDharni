import React from "react";
import SuperAdminProductListPage from "./product/list/page";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

const SuperadminView = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    if (payload.role === "SUPERADMIN") {
      return redirect("/super-admin/product/list");
    }
  }
  return (
    <div>
      <SuperAdminProductListPage />
    </div>
  );
};

export default SuperadminView;
