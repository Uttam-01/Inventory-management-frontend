import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import Delete from "@/components/ui/Delete";
import Link from "next/link";

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
          <InputBox label="Product Selection" placeholder="" />
          <InputBox label="Recieving Date" placeholder="" />
          <InputBox label="Bill No" placeholder="" />
          <div className="flex flex-col gap-1.5">
            <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
              Vendor Name
            </label>
            <input
              type="text"
              placeholder="0"
              className="h-[41px] w-[430px] border-[1px] border-[#E5E7EB] px-3 rounded-[8px]"
            />
            <div className="flex gap-2 items-center justify-start">
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_15_688)">
                  <path
                    d="M7.24219 0.21875C3.49609 0.21875 0.460938 3.25391 0.460938 7C0.460938 10.7461 3.49609 13.7812 7.24219 13.7812C10.9883 13.7812 14.0234 10.7461 14.0234 7C14.0234 3.25391 10.9883 0.21875 7.24219 0.21875ZM11.1797 7.76562C11.1797 7.94609 11.032 8.09375 10.8516 8.09375H8.33594V10.6094C8.33594 10.7898 8.18828 10.9375 8.00781 10.9375H6.47656C6.29609 10.9375 6.14844 10.7898 6.14844 10.6094V8.09375H3.63281C3.45234 8.09375 3.30469 7.94609 3.30469 7.76562V6.23438C3.30469 6.05391 3.45234 5.90625 3.63281 5.90625H6.14844V3.39062C6.14844 3.21016 6.29609 3.0625 6.47656 3.0625H8.00781C8.18828 3.0625 8.33594 3.21016 8.33594 3.39062V5.90625H10.8516C11.032 5.90625 11.1797 6.05391 11.1797 6.23438V7.76562Z"
                    fill="#2563EB"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_15_688">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="translate(0.242188)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Add New Vendor
            </div>
          </div>
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
