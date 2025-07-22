"use client";
import MaterialFlowNav from "@/components/layout/MaterialFlowNav";
import RoleProtected from "@/components/RoleProtection";
import { useAllotment } from "@/lib/hooks/wokOrderApi/useAllotment";
import { useEffect, useState } from "react";

function WIP() {
  return (
    <button className="bg-[#D4EBF7] h[29px] w-[157px] text-[#0F4C81] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]">
      Work In Progress
    </button>
  );
}
function NotStarted() {
  return (
    <button className="bg-[#E9ECEF] h[29px] w-[143px] text-[#343A40] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]">
      Not Started yet
    </button>
  );
}
function Completed() {
  return (
    <button className="bg-[#D4EDDA] h[29px] w-[111px] text-[#28B463] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]">
      Completed
    </button>
  );
}

function Ordered() {
  return (
    <button className="bg-[#feffb6] h[29px] w-[111px] text-[#28B463] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]">
      Ordered
    </button>
  );
}

function Status(e: { status: string }) {
  return (
    <div className=" flex justify-center">
      {e.status === "ORDERED" && <Ordered />}
      {e.status === "WORK_IN_PROGRESS" && <WIP />}
      {e.status === "NOT_STARTED_YET" && <NotStarted />}
      {e.status === "COMPLETED" && <Completed />}
    </div>
  );
}

export default function () {
  const [mounted, setMounted] = useState(false);
  const { data, isLoading, error } = useAllotment();
  useEffect(() => setMounted(true), []);
  // const handleDelete = (id: number) => {
  //   deleteWorkOrder
  //     .mutateAsync(id)
  //     .then(() => window.location.reload())
  //     .catch((err) => console.error("Error deleting Order:", err));
  // };

  if (!mounted) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Orders.</div>;
  console.log(data);
  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
      <div className="  mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start">
        <div className=" flex flex-col   rounded-[8px] pb-8 justify-start ">
          <MaterialFlowNav />
        </div>
        <div className="  flex flex-col bg-[#ffffff]   justify-start ">
          <div className="text-[#0F4C81] font-bold text-[20px]">
            Alloted Material
          </div>
          <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
            This section contains all active work orders for tracking and
            management.
          </div>
          <div className="flex justify-start items-center gap-2.5 my-3">
            <div className="relative h-[42px] w-[223px] flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
              <input
                type="text"
                placeholder="Search..."
                className="h-[42px] w-[223px] px-5 rounded-[6px]"
              />
            </div>
            <div className="relative h-[42px] w-[162px] flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
              <input
                type="text"
                placeholder=""
                className="h-[42px] w-[162px] px-5 rounded-[6px]"
              />
            </div>
            <div className=" h-[42px]  rounded-[8px] w-[100px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
              Sort
            </div>
          </div>

          {/* <div className="border-[1px] mt-[10px] rounded-[6px] w-full border-[#D1D5DB]">
            <div className="flex justify-between bg-[#E5E7EB] w-full h-[41px] items-center px-0">
              <div className="w-[11%] flex justify-center px-0 mx-0">Date </div>
              <div className="w-[11%] flex justify-center">Product Name</div>
              <div className="w-[11%] flex justify-center">
                Quantity Alloted
              </div>
              <div className="w-[11%] flex justify-center">Unit</div>
              <div className="w-[14%] flex justify-center">
                Work Order Number
              </div>
              <div className="w-[11%] flex justify-center">Agent</div>
              <div className="w-[14%] flex justify-center">
                Location in Store
              </div>
              <div className="w-[17%] flex justify-center">
                Status of Work Order
              </div>
            </div>
            {data.map((item: any, index: number) => (
              <div
                key={item.id}
                className={`flex justify-evenly  items-center h-[64px] ${
                  index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F3F4F6]"
                }`}
              >
                <div className="w-[11%] flex justify-center">
                  {item.allottedAt.substring(0, 10)}
                </div>
                <div className="w-[11%] flex justify-center">
                  {item.componentName}
                </div>
                <div className="w-[11%] flex justify-center">
                  {item.quantityAllotted}
                </div>
                <div className="w-[11%] flex justify-center">Kg</div>
                <div className="w-[14%] flex justify-center">
                  {item.orderId}
                </div>
                <div className="w-[11%] flex justify-center">
                  {item.allotedTo}
                </div>
                <div className="w-[14%] flex justify-center">Aisle 3</div>
                <Status status={item.status} />
              </div>
            ))}
          </div> */}
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full border border-gray-300 divide-y divide-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                    S.N.
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                    Quantity Alloted
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                    Work Order Number
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                    Location in Store
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                    Status of Work Order
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-3 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      {item.allottedAt.substring(0, 10)}
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      {item.componentName}
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      {item.quantityAllotted}
                    </td>
                    <td className="px-6 py-3 border border-gray-300">kg</td>
                    <td className="px-6 py-3 border border-gray-300">
                      {item.orderId}
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      {item.allotedTo}
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      Aisle 3
                    </td>
                    <td className="pl-6  py-3 border border-gray-300">
                      <Status status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleProtected>
  );
}
