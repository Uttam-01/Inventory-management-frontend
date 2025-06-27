import { useState } from "react";
import Navigaion from "./Navigation";
import Link from "next/link";
import SidebarOption from "../ui/SidebarOption";
function Navbar() {
  return (
    <div className="">
        <div
          className="bg-white  fixed h-screen w-[256px] shadow transition-transform duration-300 z-40
         top-0 left-0"
        >
          <div className="w-full flex-col flex items-center justify-center mt-[50px]">
            <SidebarOption to={"/dashboard"} name="Dashboard"/>
            <SidebarOption to={"/machine-list"} name="Machine List"/>
            <SidebarOption to={"/component-master"} name="Component Master"/>
            <SidebarOption to={"/vendor-management"} name="Vendor Management"/>
            <SidebarOption to={"/work-order-master"} name="Work Order Master"/>
            <SidebarOption to={"/administrator-dashboard"} name="admin dash"/>

          </div>
          
        </div>
      
    </div>
  );
}

export default Navbar;
