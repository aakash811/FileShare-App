"use client";
import { File, Shield, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";

function Sidenav({ closeSidebar }) {
  const menuList = [
    {
      id: 1,
      name: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      id: 2,
      name: "Files",
      icon: File,
      path: "/files",
    },
    {
      id: 3,
      name: "Upgade",
      icon: Shield,
      path: "/upgrade",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="shadow-sm border-r h-full">
      <div className="p-5">
        <Image src="/logo.svg" width={150} height={100} />
      </div>

      <div className="flex flex-col w-full">
        {menuList.map((item, index) => (
          <Link key={item.id} href={item.path}>
            <button
              className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 ${
                activeIndex === index ? "bg-blue-50 text-primary" : null
              }`}
              onClick={() => {
                setActiveIndex(index);
                closeSidebar();
              }}
            >
              <item.icon />
              <h2>{item.name}</h2>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidenav;
