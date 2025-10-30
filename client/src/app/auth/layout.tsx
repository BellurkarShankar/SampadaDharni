import Image from "next/image";
import React from "react";
import wall from "../../../public/bg_wall/background.jpg";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen min-w-screen">
      <div className="hidden lg:block w-1/2 bg-[#ffede1] relative overflow-hidden">
        <Image
          src={wall}
          alt="layout"
          fill
          style={{ objectFit: "cover", objectPosition: "left" }}
          priority
        />
      </div>
      <div className="lg:w-1/2 w-full ">{children}</div>
    </main>
  );
};

export default Layout;
