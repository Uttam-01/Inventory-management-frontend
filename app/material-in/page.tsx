"use client";
import SearchDropdown from "@/components/layout/searchDropdown";
import { useComponents } from "@/lib/api/componentApi/useComponents";
import { useInventory } from "@/lib/api/inventoryApi/useInventory";
import { useVendors } from "@/lib/api/vendorApi/useVendors";
import { useEffect, useState } from "react";

function InputBox(e: { label: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input
        type="text"
        placeholder={e.placeholder}
        className="h-[41px] w-[430px] border-[1px] border-[#E5E7EB] px-3 rounded-[8px]"
      />
    </div>
  );
}

export default function () {
  const [mounted, setMounted] = useState(false);
  const [components, setComponents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [vendors, setVendors] = useState<any[]>([]);
  const [searchVendor, setSearchVendor] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [VendorOpen, setVendorOpen] = useState<boolean>(false);
  const [vendorMounted, setvendorMounted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => setMounted(true), []);
  useEffect(() => setvendorMounted(true), []);

  const {
    data: Components,
    isLoading: isComponentLoading,
    error: componentError,
  } = useComponents();
  const {
    data: Vendors,
    isLoading: isVendorLoading,
    error: vendorError,
  } = useVendors();

  useEffect(() => {
    if (Components) setComponents(Components);
  }, [Components]);

  useEffect(() => {
    if (Vendors) setVendors(Vendors);
  }, [Vendors]);

  useEffect(() => setMounted(true), []);
  const { data, isLoading, error } = useInventory();
  if (!mounted) return null;
  else if (isLoading) return <div>Loading.....</div>;
  else if (error) return <div>Error loading components.</div>;
  console.log(data);
  return (
    <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
      <div className="text-[#0F4C81] font-bold text-[20px]">Material IN</div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
        Use this form to record new material entries quickly and efficiently.
      </div>
      <div>
        <div className="text-[#343A40] text-[18px] font-bold mb-0.5 mt-3">
          Record New Material Entry
        </div>
        <form action="" className="flex flex-wrap gap-y-3 justify-between">
          <SearchDropdown
            label="Component"
            placeholder="Select Component"
            data={Components}
            selected={selected}
            onSelect={setSelected}
            isLoading={isComponentLoading}
            error={!!componentError}
            formError={formErrors.componentId}
          />
          <InputBox label="Recieving Date" placeholder="" />
          <InputBox label="Bill No" placeholder="" />
          <SearchDropdown
            label="Vendor"
            placeholder="Select Vendor"
            data={Vendors}
            selected={selectedVendor}
            onSelect={setSelectedVendor}
            isLoading={isVendorLoading}
            error={!!vendorError}
            formError={formErrors.vendorId}
          />
          <InputBox label="Quantity" placeholder="0" />
          <InputBox label="Unit Price" placeholder="0" />
          <InputBox label="GST %" placeholder="0" />
          <InputBox label="Packing Charges" placeholder="0" />
          <InputBox label="Transport Charges" placeholder="0" />
          <InputBox label="O/H" placeholder="0" />
          <div className="flex flex-col gap-1.5">
            <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
              Remarks
            </label>
            <textarea
              placeholder=""
              className="h-[41px] min-h-[41px] w-[886px] border-[1px] pt-2 border-[#E5E7EB] px-3 rounded-[8px] resize-y "
            />
          </div>
        </form>
      </div>
      <div className="text-[#0F4C81] bg-[#E0F2F7] flex justify-center rounded-[8px] my-6 text-[16px] font-bold  font-emoji h-[56px] items-center">
        Total Effective Price / Unit: ₹0
      </div>
      <div className=" h-[42px]  rounded-[8px] w-Full  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
        Record Material IN
      </div>
      <div className="text-[#343A40] text-[18px] font-bold  mt-6">
        Recent Material IN Entries
      </div>

      <div className="border-[1px] rounded-[6px] border-[#D1D5DB] mt-1 mb-6">
        <div className="flex justify-center bg-[#E5E7EB] h-[41px] border-b-[1px] border-[#D1D5DB] items-center">
          <div className="w-[10%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Date
          </div>
          <div className="w-[10%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Bill No
          </div>
          <div className="w-[12%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Product Name
          </div>
          <div className="w-[12%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Vendor
          </div>
          <div className="w-[10%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Quantity
          </div>
          <div className="w-[10%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Unit{" "}
          </div>
          <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Total Effective Price
          </div>
          <div className="w-[32%] flex justify-center items-center   text-[16px] text-[#6B7280] font-bold h-full">
            Remarks
          </div>
        </div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className={`flex justify-evenly  items-center h-[41px] ${
              index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F3F4F6]"
            }  ${index === 1 ? "" : "border-b-[1px] border-[#D1D5DB]"} `}
          >
            <div className="w-[10%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              23-01-01
            </div>
            <div className="w-[10%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              001
            </div>
            <div className="w-[12%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              Product 1
            </div>
            <div className="w-[12%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              Vendor 1
            </div>
            <div className="w-[10%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              25 Kg
            </div>
            <div className="w-[10%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              Kg
            </div>
            <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              ₹500
            </div>
            <div className="w-[32%] flex justify-center items-center h-full">
              No Remarks
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
