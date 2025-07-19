"use client";

import { useComponents } from "@/lib/api/componentApi/useComponents";
import { useState } from "react";
import GlobalLoader from "./GlobalLoader";
interface ComponentDropdownProps {
  selected: any;
  setSelected: (component: any) => void;
    formErrors? : { [key: string]: string }
}

export default function ComponentDropdown({
  selected,
  setSelected,
  formErrors
}: ComponentDropdownProps) {
  const [componentFilters, setComponentFilters] = useState<{
    keyword?: string;
    page?: number;
  }>({ keyword: "", page: 0 });
  const { data, isLoading, error } = useComponents(componentFilters);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  //console.log(data)
  console.log("comp", formErrors)

  return (

    <div className="relative flex flex-col  w-[338px]">
                  <button
                    type="button"
                    onClick={() => setIsOpen(isOpen ? false : true)}
                    className="h-[50px] w-full border-[1px] border-[#D1D5DB] flex items-center justify-between  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                  >
                    {selected ? selected.displayName : "Component Name"}
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
                  {formErrors?.componentId && (
                    <span className="text-red-500 text-xs">
                      {formErrors?.componentId}
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
                          value={componentFilters.keyword}
                          onChange={(e) => {
                            setComponentFilters((prev) => ({
                              ...prev,
                              keyword: e.target.value,
                            }));
                          }}
                          className="border border-gray-300 rounded h-[50px] p-2 w-full  mt-3"
                        />
                    { isLoading ? (
                      <div className="w-full h-full"><GlobalLoader/></div>
                      
                    ) : error ? (
                      <div>Error loading components.</div>
                    ) : (
                        <ul className="  w-full h-[300px] top-0 overflow-y-auto bg-white ">
                          {data.content.length === 0 && (
                            <li className="p-2 text-gray-400">
                              No components found
                            </li>
                          )}
                          {data.content.map((component: any, i: any) => (
                            <li
                              key={component.id ? component.id : i}
                              className={`p-2 cursor-pointer hover:bg-blue-100 ${
                                selected === component.id ? "bg-blue-50" : ""
                              }`}
                              onClick={() => {
                                setSelected(component);
                                setIsOpen(false);
                              }}
                            >
                              {component.displayName}
                            </li>
                          ))}
                        </ul>
                      
                    )}
                  </div>
                </div>
  );
}
