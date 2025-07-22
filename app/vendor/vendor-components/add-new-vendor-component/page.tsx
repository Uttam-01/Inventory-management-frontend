"use client";

import React, { useEffect, useState } from "react";
import { useComponents } from "@/lib/hooks/componentApi/useComponents";
import { useAddVendorComponent } from "@/lib/hooks/vendor-componentApi/useAddVendorComponent";
import { VendorComponent, vendorComponentSchema } from "@/lib/schemas";
import { useVendors } from "@/lib/hooks/vendorApi/useVendors";
import GlobalLoader from "@/components/layout/GlobalLoader";
import ComponentDropdown from "@/components/layout/ComponentsDropdown";
import VendorDropdown from "@/components/layout/VendorDropdown";

function InputBox(e: {
  label: string;
  placeholder: string;
  name: string;
  error: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
}) {
  return (
    <div className="relative flex flex-col">
      <label htmlFor="" className="text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input
        name={e.name}
        value={e.value ?? ""}
        className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
        type="text"
        placeholder={e.placeholder}
        onChange={e.onChange}
      />
      {e.error && <span className="text-red-500 text-xs">{e.error}</span>}
    </div>
  );
}

export default function () {
  const [selected, setSelected] = useState<any>(null);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [price, setPrice] = useState<number>();
  const [delTime, setDelTime] = useState<string>();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const addVendorComponent = useAddVendorComponent();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("sdfg", selected);
    if (!selectedVendor?.id || !selected?.id) {
      setFormErrors((prev) => ({ ...prev, vendorId: "Vendor is required" , componentId : "Component is required" }));
      console.log(formErrors);
      return;
    }
    const reqData = {
      componentId: selected.id,
      vendorId: selectedVendor.id,
      unitPrice: Number(price),
      deliveryTimeInDays: delTime,
    };
    const result = vendorComponentSchema.safeParse(reqData);
    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFormErrors(errors);
      console.log(errors);
      return;
    }
    setFormErrors({});
    addVendorComponent.mutate(result.data);
  }
  if (addVendorComponent.isSuccess) return <p>Saved successfully!</p>;
  if (addVendorComponent.isError) {
    console.log("->>>>", addVendorComponent.error);
    return <p>This component is already assigned to the vendor.</p>;
  }
  return (
    <div
      className="w-[766px] mx-auto p-8 bg-[#ffffff] rounded-[8px]"
      style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}
    >
      <div className="text-[#0F4C81] font-bold text-[20px]">
        Add Vendor Components
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[47px] items-center">
        Define vendor and components details or update existing information.
      </div>
      <form onSubmit={onSubmit}>
        <div className="mt-[25px]">
          <div className="flex  flex-wrap gap-x-6 gap-y-8 mt-[10px]">
            <ComponentDropdown
              selected={selected}
              setSelected={setSelected}
              formErrors={formErrors}
            />
            <VendorDropdown
              selected={selectedVendor}
              setSelected={setSelectedVendor}
              formErrors={formErrors}
            />
            {/* <div className="relative flex flex-col  w-[338px]">
              <button
                type="button"
                onClick={() => setVendorOpen(VendorOpen ? false : true)}
                className="h-[50px] w-full border-[1px] border-[#D1D5DB] flex items-center justify-between  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
              >
                {selectedVendor ? selectedVendor.name : "Vendor Name"}
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
              {formErrors.vendorId && (
                <span className="text-red-500 text-xs">
                  {formErrors.vendorId}
                </span>
              )}

              <div
                className={`${
                  VendorOpen ? "block" : "hidden"
                } absolute top-12 bg-[#FFFFFF] z-10 flex flex-col w-full border-[1px] border-[#D1D5DB] h-[400px]  items-start justify-between  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]`}
              >
                {!vendorMounted ? null : isVendorLoading ? (
                  <div>Loading...</div>
                ) : vendorError ? (displayN
                  <div>Error loading Vendors.</div>
                ) : (
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="SearchVendors..."
                      value={searchVendor}
                      onChange={(e) => setSearchVendor(e.target.value)}
                      className="border border-gray-300 rounded h-[50px] p-2 w-full my-2"
                    />
                    <div className="  w-full h-[300px] overflow-y-auto bg-white ">
                      {filteredVendors.length === 0 && (
                        <div className="p-2 text-gray-400">
                          No components found
                        </div>
                      )}
                      {filteredVendors.map((k, i) => (
                        <div
                          key={k.id ? k.id : i}
                          className={`p-2 cursor-pointer hover:bg-blue-100 ${
                            selectedVendor === k.id ? "bg-blue-50" : ""
                          }`}
                          onClick={() => {
                            setSelectedVendor(k);
                            setVendorOpen(false);
                          }}
                        >
                          {k.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div> */}
            <div className="relative flex flex-col">
              <label
                htmlFor=""
                className="text-[#343A40] text-[14px] font-normal"
              >
                Per Unit Price
              </label>
              <input
                name="unitPrice"
                className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                type="text"
                placeholder="Per Unit Price"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              {formErrors.unitPrice && (
                <span className="text-red-500 text-xs">
                  {formErrors.unitPrice}
                </span>
              )}
            </div>
            <div className="relative flex flex-col">
              <label
                htmlFor=""
                className="text-[#343A40] text-[14px] font-normal"
              >
                Delivery time (In Days)
              </label>
              <input
                name="delTime"
                className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                type="text"
                placeholder="Delivery"
                onChange={(e) => setDelTime(e.target.value)}
              />
              {formErrors.deliveryTimeInDays && (
                <span className="text-red-500 text-xs">
                  {formErrors.deliveryTimeInDays}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex h-[42px] items-center justify-end gap-4 mt-[25px]">
          <div className="border-[#6B7280] hover:cursor-pointer h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px]  text-[#6B7280] text-[16px] font-normal flex items-center justify-center">
            Cancel
          </div>
          <button className="hover:cursor-pointer h-[42px]  rounded-[8px] w-[200px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
            Save Vendor Component
          </button>
        </div>
      </form>
    </div>
  );
}
