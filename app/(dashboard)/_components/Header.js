"use client";
import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Sidenav from "./SideNav";

function Header() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div>
      <div className="flex p-5 border-b items-center justify-between md:justify-end">
        <AlignJustify
          className="md:hidden"
          onClick={toggleSideNav}
          style={{ cursor: "pointer" }}
        />
        <Image src="/logo.svg" width={150} height={100} className="md:hidden" />
        <UserButton />
      </div>
      {isSideNavOpen && <Sidenav />}
    </div>
  );
}

export default Header;
