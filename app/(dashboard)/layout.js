"use client";
import React, { useState } from "react";
import Sidenav from "./_components/SideNav";
import Header from "./_components/Header";

function layout({ children }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div className="h-full md:w-64 flex-col fixed inset-y-0 z-50 md:flex hidden">
        <Sidenav
          closeSidebar={() => {
            setToggle(false);
          }}
        />
      </div>

      {toggle ? (
        <div className="h-full w-64 flex-col fixed inset-y-0 z-30 flex bg-white">
          {" "}
          <Sidenav
            closeSidebar={() => {
              setToggle(false);
            }}
          />
        </div>
      ) : null}
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default layout;
