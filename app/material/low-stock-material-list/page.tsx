"use client";
import GlobalLoader from "@/components/layout/GlobalLoader";
import MaterialFlowNav from "@/components/layout/MaterialFlowNav";
import RoleProtected from "@/components/RoleProtection";
import { useLowStock } from "@/lib/hooks/useLowStock";
import { useEffect, useState } from "react";

export default function () {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data, isLoading, error } = useLowStock();
  if (!mounted) return null;
  if (isLoading) return <GlobalLoader />;
  if (error) return <div>Error loading loaw stock Material List</div>;
  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN" , "ADMIN"]}>
      <div className=" mx-auto flex flex-col rounded-[8px]  justify-start">
        <div className=" mx-auto flex flex-col   rounded-[8px] pb-8 justify-start ">
          <MaterialFlowNav />
        </div>
        <div className=" mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
          <div className="text-[#0F4C81] font-bold text-[20px]">
            Low Stock Material List
          </div>
          <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
            This report highlights materials that are currently low in stock and
            require immediate procurement.
          </div>
          <div className="flex justify-between items-center my-4">
            <div className="relative h-[42px] w-[223px] flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
              <input
                type="text"
                placeholder="Search..."
                className="h-[42px] w-[223px] px-5 rounded-[6px]"
              />
            </div>
          </div>

          <div className="border-[1px] mt-[10px] rounded-[6px] border-[#E5E7EB]">
            <div className="flex justify-center bg-[#FFFFFF] h-[41px] items-center border-b-[1px] border-[#E5E7EB]">
              <div className="w-[20%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000] border-r-[1px] border-[#E5E7EB]">
                Product Name
              </div>
              <div className="w-[20%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  border-r-[1px] border-[#E5E7EB]">
                Category
              </div>
              <div className="w-[20%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  border-r-[1px] border-[#E5E7EB]">
                Current Stock
              </div>
              <div className="w-[20%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  border-r-[1px] border-[#E5E7EB]">
                Min Stock
              </div>
              <div className="w-[20%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  ">
                Diffrence
              </div>
            </div>
            {data.map((item: any, index: number) => (
              <div
                key={item.id}
                className={`flex justify-evenly  items-center h-[41px] ${
                  index === 3 ? "" : "border-b-[1px] border-[#E5E7EB]"
                }`}
              >
                <div className="w-[20%] flex justify-center items-center h-full bg-[#FEE2F2] border-r-[1px] border-[#E5E7EB] border-l-[3px] border-l-[#DC3545]">
                  {item.name}
                </div>
                <div className="w-[20%] flex justify-center items-center h-full bg-[#FEE2F2] border-r-[1px] border-[#E5E7EB]">
                  {item.category}
                </div>
                <div className="w-[20%] flex justify-center items-center h-full bg-[#FEE2F2] border-r-[1px] border-[#E5E7EB]">
                  {item.currentStock}
                </div>
                <div className="w-[20%] flex justify-center items-center h-full bg-[#FEE2F2] border-r-[1px] border-[#E5E7EB]">
                  {item.minimumStock}{" "}
                </div>
                <div className="w-[20%] flex justify-center items-center h-full bg-[#FEE2F2]  text-[#DC3545]">
                  {item.difference}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleProtected>
  );
}
