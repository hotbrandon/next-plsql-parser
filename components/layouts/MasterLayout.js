import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";

const MasterLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <div className="bg-slate-50 min-w-[250px] p-4">
          {/* menu on the left */}
          <SideBar />
        </div>
        <div className="flex-1 p-4">
          {/* main content on the right */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
