import React from "react";
import Sidenav from "./_components/SideNav";
import Header from "./_components/Header";

function layout({ children }) {
  return (
    <div>
      <div className="h-full md:w-64 flex-col fixed inset-y-0 z-50 md:flex hidden">
        <Sidenav />
      </div>
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default layout;
