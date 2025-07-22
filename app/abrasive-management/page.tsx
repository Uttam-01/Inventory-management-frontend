"use client";
import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import { useDeleteComponent } from "@/lib/hooks/componentApi/useDeleteComponent";

import { useComponents } from "@/lib/hooks/componentApi/useComponents";
import { useEffect, useState } from "react";
import RoleProtected from "@/components/RoleProtection";
import Link from "next/link";
import GlobalLoader from "@/components/layout/GlobalLoader";

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
  else if (isLoading) return <GlobalLoader />;
  else if (error) return <div>Error loading components.</div>;
  async function deleteComponent(id: number) {
    delComponent
      .mutateAsync(id)
      .then(() => window.location.reload())
      .catch((err) => console.error("Error deleting Component:", err));
  }

  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
      <div className=" mx-auto flex flex-col gap-8 bg-[#ffffff] rounded-[8px] p-8 justify-start ">
        <div>
          <div className="text-[#0F4C81] font-bold text-[20px]">
            Abrasives Management
          </div>
          <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
            This is where you can manage your Abrasives effectively.
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  S.N.
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Available Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Min Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Reserved
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.content.map((component: Component, index: number) => (
                <tr
                  key={index}
                  className={
                    component.status === "OK"
                      ? "hover:bg-gray-50"
                      : "bg-red-200"
                  }
                >
                  <td className="px-6 py-3 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {component.status}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {component.displayName}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {component.availableStock}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {component.minimumStock}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">10</td>
                  <td className="px-6 py-3 border border-gray-300">
                    {component.locationInStore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RoleProtected>
  );
}
