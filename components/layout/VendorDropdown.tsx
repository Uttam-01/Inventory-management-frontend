"use client";

import { useComponents } from "@/lib/hooks/componentApi/useComponents";
import { useState } from "react";
import GlobalLoader from "./GlobalLoader";
import { useVendors } from "@/lib/hooks/vendorApi/useVendors";
interface VendorDropdownProps {
  selected: any;
  setSelected: (Vendor: any) => void;
 formErrors?: Record<string, string>;
}

export default function VendorDropdown({
  selected,
  setSelected,
  formErrors
}: VendorDropdownProps) {
  const [vendorFilters, setVendorFilters] = useState<{
    search?: string;
    page?: number;
  }>({ search: "", page: 0 });
  const { data, isLoading, error } = useVendors(vendorFilters);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //console.log(data)
  console.log("FormErrors in VendorDropdown:", formErrors);

  return (

    <div className="relative flex flex-col  w-[338px]">
                  <button
                    type="button"
                    onClick={() => setIsOpen(isOpen ? false : true)}
                    className="h-[50px] w-full border-[1px] border-[#D1D5DB] flex items-center justify-between  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                  >
                    {selected ? selected.name : "Vendor Name"}
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.55713 10L12.5571 15L17.5571 10"
                        stroke="#B2B2B2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {formErrors?.vendorId && (
                    <span className="text-red-500 text-xs">
                      {formErrors?.vendorId}
                    </span>
                  )}
    
                  <div
                    className={`${
                      isOpen ? "block" : "hidden"
                    } absolute top-12 gap-2 bg-[#FFFFFF] z-10 flex flex-col w-full border-[1px] border-[#D1D5DB] h-[400px]  items-start justify-start  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]`}
                  >
                    <input
                          type="text"
                          placeholder="Search components..."
                          value={vendorFilters.search}
                          onChange={(e) => {
                            setVendorFilters((prev) => ({
                              ...prev,
                              search: e.target.value,
                            }));
                          }}
                          className="border border-gray-300 rounded h-[50px] p-2 w-full  mt-3"
                        />
                    { isLoading ? (
                      <div className="w-full h-full"><GlobalLoader/></div>
                      
                    ) : error ? (
                      <div>Error loading Vendors.</div>
                    ) : (
                        <ul className="  w-full h-[300px] top-0 overflow-y-auto bg-white ">
                          {data.content.length === 0 && (
                            <li className="p-2 text-gray-400">
                              No vendors found
                            </li>
                          )}
                          {data.content.map((vendor: any, i: any) => (
                            <li
                              key={vendor.id ? vendor.id : i}
                              className={`p-2 cursor-pointer hover:bg-blue-100 ${
                                selected === vendor.id ? "bg-blue-50" : ""
                              }`}
                              onClick={() => {
                                setSelected(vendor);
                                setIsOpen(false);
                              }}
                            >
                              {vendor.name}
                            </li>
                          ))}
                        </ul>
                      
                    )}
                  </div>
                </div>
  );
}
