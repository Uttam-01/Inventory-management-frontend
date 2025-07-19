"use client";
import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import { useEffect, useState } from "react";
import { useVendors } from "@/lib/api/vendorApi/useVendors";
import { useDeleteVendor } from "@/lib/api/vendorApi/useDeleteVendor";
import GlobalLoader from "@/components/layout/GlobalLoader";
export default function () {
  type Vendor = {
    id: number;
    city: string;
    gstNumber: string;
    name: string;
    phoneNumber: string;
  };
  const deleteVendor = useDeleteVendor();
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<{ search?: string; city?: string ; page?: number}>({
    search: "",
    city: "",
    page : 0,
  });
  useEffect(() => setMounted(true), []);

  const handleDelete = (id: number) => {
    deleteVendor
      .mutateAsync(id)
      .then(() => window.location.reload())
      .catch((err) => console.error("Error deleting Vendor:", err));
  };

  const { data, isLoading, error } = useVendors(filters);

  if (!mounted) return null;

  console.log(data);
  return (
    <div className=" mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
      <div className="text-[#0F4C81] font-bold text-[20px]">
        Vendor Management
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
        Manage your vendor information efficiently.
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <AddButton
            to="/vendor-management/add-new-vendor"
            text="Add New Vendor"
          />
          <AddButton to="/vendor-components" text="Add component" />
        </div>
        <div className="flex gap-5">
          <div className="relative h-[50px] w-[300px] flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
            <input
              type="text"
              placeholder="Search Vendors..."
              className="h-[50px] w-full px-10 rounded-[6px]"
              value={filters.search}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, search: e.target.value }));
              }}
            />
            <svg
              className="absolute top-4 left-3"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_40_374)">
                <path
                  d="M16.6099 13.8344L13.4942 10.7188C13.3536 10.5781 13.163 10.5 12.963 10.5H12.4536C13.3161 9.39688 13.8286 8.00937 13.8286 6.5C13.8286 2.90937 10.9192 0 7.32861 0C3.73799 0 0.828613 2.90937 0.828613 6.5C0.828613 10.0906 3.73799 13 7.32861 13C8.83799 13 10.2255 12.4875 11.3286 11.625V12.1344C11.3286 12.3344 11.4067 12.525 11.5474 12.6656L14.663 15.7812C14.9567 16.075 15.4317 16.075 15.7224 15.7812L16.6067 14.8969C16.9005 14.6031 16.9005 14.1281 16.6099 13.8344ZM7.32861 10.5C5.11924 10.5 3.32861 8.7125 3.32861 6.5C3.32861 4.29063 5.11611 2.5 7.32861 2.5C9.53799 2.5 11.3286 4.2875 11.3286 6.5C11.3286 8.70938 9.54111 10.5 7.32861 10.5Z"
                  fill="#9CA3AF"
                />
              </g>
              <defs>
                <clipPath id="clip0_40_374">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.828613)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="relative h-[50px] w-[300px] flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
            <input
              type="text"
              placeholder="Search Tities..."
              className="h-[50px] w-full px-10 rounded-[6px]"
              value={filters.city}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, city: e.target.value }));
              }}
            />
            <svg
              className="absolute top-4 left-3"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_40_374)">
                <path
                  d="M16.6099 13.8344L13.4942 10.7188C13.3536 10.5781 13.163 10.5 12.963 10.5H12.4536C13.3161 9.39688 13.8286 8.00937 13.8286 6.5C13.8286 2.90937 10.9192 0 7.32861 0C3.73799 0 0.828613 2.90937 0.828613 6.5C0.828613 10.0906 3.73799 13 7.32861 13C8.83799 13 10.2255 12.4875 11.3286 11.625V12.1344C11.3286 12.3344 11.4067 12.525 11.5474 12.6656L14.663 15.7812C14.9567 16.075 15.4317 16.075 15.7224 15.7812L16.6067 14.8969C16.9005 14.6031 16.9005 14.1281 16.6099 13.8344ZM7.32861 10.5C5.11924 10.5 3.32861 8.7125 3.32861 6.5C3.32861 4.29063 5.11611 2.5 7.32861 2.5C9.53799 2.5 11.3286 4.2875 11.3286 6.5C11.3286 8.70938 9.54111 10.5 7.32861 10.5Z"
                  fill="#9CA3AF"
                />
              </g>
              <defs>
                <clipPath id="clip0_40_374">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.828613)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      {isLoading ? (
        <GlobalLoader />
      ) : error ? (
        <div>Error loading Vendors.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  S.N.
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Contact No.
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  City
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  GST No.
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(data.content).map((vendor: Vendor, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-3 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {vendor.name}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {vendor.phoneNumber}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {vendor.city}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {vendor.gstNumber}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    <div className="flex gap-2">
                      <Edit
                        to={`/vendor-management/edit-vendor/${vendor.id}`}
                      />
                      <div
                        onClick={() => {
                          handleDelete(vendor.id);
                        }}
                        className="hover:cursor-pointer p-2 rounded-[5px] bg-[#E0F2F7] flex items-center justify-center"
                      >
                        <svg
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_16_2934)">
                            <path
                              d="M14.6433 1.00001H10.8933L10.5996 0.41563C10.5373 0.290697 10.4415 0.185606 10.3228 0.11218C10.2041 0.0387537 10.0673 -9.46239e-05 9.92769 5.47897e-06H6.35581C6.21655 -0.00052985 6.07996 0.0381736 5.96169 0.111682C5.84341 0.18519 5.74823 0.290529 5.68706 0.41563L5.39331 1.00001H1.64331C1.5107 1.00001 1.38353 1.05268 1.28976 1.14645C1.19599 1.24022 1.14331 1.3674 1.14331 1.50001V2.50001C1.14331 2.63261 1.19599 2.75979 1.28976 2.85356C1.38353 2.94733 1.5107 3.00001 1.64331 3.00001H14.6433C14.7759 3.00001 14.9031 2.94733 14.9969 2.85356C15.0906 2.75979 15.1433 2.63261 15.1433 2.50001V1.50001C15.1433 1.3674 15.0906 1.24022 14.9969 1.14645C14.9031 1.05268 14.7759 1.00001 14.6433 1.00001ZM2.80581 14.5938C2.82966 14.9746 2.99774 15.332 3.27583 15.5932C3.55392 15.8545 3.92112 16 4.30269 16H11.9839C12.3655 16 12.7327 15.8545 13.0108 15.5932C13.2889 15.332 13.457 14.9746 13.4808 14.5938L14.1433 4.00001H2.14331L2.80581 14.5938Z"
                              fill="#DC3545"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_16_2934">
                              <rect
                                width="16"
                                height="16"
                                fill="white"
                                transform="translate(0.143311)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
