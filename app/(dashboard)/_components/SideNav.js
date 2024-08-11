"use client";
import { File, Shield, Upload } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Sidenav() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); // Initialize the router
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
      name: "Upgrade",
      icon: Shield,
      path: "/upgrade",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true); // Set mounted to true after component mounts
  }, []);

  const handleNavigation = (path, index) => {
    setActiveIndex(index);
    if (mounted) {
      router.push(path); // Navigate to the specified path
    }
  };

  return (
    <div className="shadow-sm border-r h-full">
      <div className="p-5">
        <Image src="/logo.svg" width={150} height={100} />
      </div>

      <div className="flex flex-col w-full">
        {menuList.map((item, index) => (
          <button
            key={item.id}
            className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 ${
              activeIndex === index ? "bg-blue-50 text-primary" : null
            }`}
            onClick={() => handleNavigation(item.path, index)} // Use the handleNavigation function
          >
            <item.icon />
            <h2>{item.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidenav;
