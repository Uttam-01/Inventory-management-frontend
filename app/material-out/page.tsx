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
        <div className="text-[#343A40] text-[18px] font-bold  mt-6">Recent Material OUT Entries</div>

        <div className="border-[1px] rounded-[6px] border-[#D1D5DB] mt-1 mb-6">
        <div className="flex justify-center bg-[#E5E7EB] h-[41px] border-b-[1px] border-[#D1D5DB] items-center">
          <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">Date</div>
          <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">Product Name</div>
          <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">Quantity</div>
          <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">Work Order </div>
          <div className="w-[20%] flex justify-center items-center   text-[16px] text-[#6B7280] font-bold h-full">Issued To</div>
        </div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className={`flex justify-evenly  items-center h-[41px] ${
              index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F3F4F6]"
            }  ${index=== 1 ? "" : "border-b-[1px] border-[#D1D5DB]"} `}
          >
            <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">23-01-01</div>
            <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">Product 1</div>
            <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">10 Kg</div>
            <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">WO 1</div>
            <div className="w-[20%] flex justify-center items-center h-full">Labour 1</div>
          </div>
        ))}
      </div>
    </div>
  );
}
