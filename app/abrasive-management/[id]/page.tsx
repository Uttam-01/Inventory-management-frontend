"use client";
import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import { useDeleteComponent } from "@/lib/api/componentApi/useDeleteComponent";

import { useComponents } from "@/lib/api/componentApi/useComponents";
import { useEffect, useState } from "react";
import RoleProtected from "@/components/RoleProtection";
import Link from "next/link";

export default function () {
  type Component = {
    id: number;
    availableStock: number;
    locationInStore: string;
    minimumStock: number;
    displayName: string;
    status: string;
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const delComponent = useDeleteComponent();
  const { data, isLoading, error } = useComponents();
  if (!mounted) return null;
  else if (isLoading) return <div>Loading.....</div>;
  else if (error) return <div>Error loading components.</div>;
  async function deleteComponent(id: number) {
    delComponent
      .mutateAsync(id)
      .then(() => window.location.reload())
      .catch((err) => console.error("Error deleting Component:", err));
  }

  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
      <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
        <div className="text-[#0F4C81] font-bold text-[20px]">
          Abrasive Name
        </div>
        <div className="text-[#343A40]  flex flex-col gap-2  mt-3 rounded-[8px] mb-5 text-[14px] font-normal  font-emoji  items-Start">
          <div className="font-bold">Available Stock - <span className="font-normal pl-[20px]">124</span></div>
          <div className="font-bold">Minimum Stock - <span className="font-normal pl-[20px]">124</span></div>
          <div className="font-bold">Location - <span className="font-normal pl-[20px]">Rack B2</span></div>
          <div className="font-bold">Description - <span className="font-normal pl-[20px]">Description Of Abrasive</span></div>
        </div>
        <div className="text-[#0F4C81] font-bold text-[20px]">
          Vendors List
        </div>
        <div className="border-[1px] mt-3 rounded-[6px] border-[#D1D5DB]">
          <div className="flex justify-between bg-[#FFFFFF] h-[41px] items-center border-[#D1D5DB] border-b-[1px]">
            <div className="w-[10%] flex justify-center">Sr. No.</div>
            <div className="w-[20%] flex justify-center">Vendor Name</div>
            <div className="w-[15%] flex justify-center">Contact</div>
            <div className="w-[10%] flex justify-center">Unit Price</div>
            <div className="w-[15%] flex justify-center">Delivery Time (in Days)</div>
            <div className="w-[30%] flex justify-center">Remarks</div>
            
          </div>
          {data.map((component: Component, index: number) => (
           index<3 && <div
              key={component.id ? component.id : index}
              className={`flex justify-evenly  items-center h-[64px] ${
                component.status === "OK" ? "bg-[#ffffff]" : "bg-[#F89C9C]"
              }`}
            >
                <div className="w-[10%] flex justify-center">
                {index+1}
              </div>
                
              <div className="w-[20%] flex justify-center">
                Vendor's Name
              </div>
              <div className="w-[15%] flex justify-center">9876543210</div>
              <div className="w-[10%] flex justify-center">
                20
              </div>
              <div className="w-[15%] flex justify-center">10</div>
              <div className="w-[30%] flex justify-center">
                Some remarks about vendor.
              </div>
            </div>
          ))}
        </div>
        

        
      </div>
    </RoleProtected>
  );
}
