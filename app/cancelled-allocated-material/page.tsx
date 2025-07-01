import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import Delete from "@/components/ui/Delete";
import Link from "next/link";

function InputBox(e: { label: string; placeholder: string }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input
        type="text"
        placeholder={e.placeholder}
        className="h-[41px] w-full border-[1px] border-[#E5E7EB] px-3 rounded-[8px]"
      />
    </div>
  );
}

export default function () {
  return (
    <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
      <div className="text-[#0F4C81] font-bold text-[20px]">Cancelled Allocated Material</div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
        This section allows you to cancel or reallocate reserved materials. Please follow the instructions carefully.
      </div>
      <div>
        <div className="text-[#343A40] text-[18px] font-bold mb-0.5 mt-3">
          Cancel / Reallocate Reserved Material
        </div>
        <form action="" className="flex flex-col w-full flex-wrap gap-y-3 justify-between">
          <InputBox label="Work Order FROM" placeholder="" />
          <InputBox label="Material" placeholder="" />
          <InputBox label="Quantity" placeholder="" />
        </form>
      </div>
      <div className="flex justify-start items-start gap-3 mt-6">
        <div className=" h-[42px]  rounded-[4px] px-4  text-[#FFFFFF] bg-[#EF4444] text-[16px] text-emoji font-normal flex items-center justify-center">
        Cancel Allotment
      </div>
      <div className=" h-[42px]  rounded-[4px] px-4  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
        Reallocate to another WO
      </div>
      </div>
      
      <div className="text-[#343A40] text-[18px] font-bold  mt-6">
        History of Cancelled/Reallocated Materials
      </div>

      <div className="border-[1px] rounded-[6px] border-[#D1D5DB] mt-1 mb-6">
        <div className="flex justify-between bg-[#FFFFFF] h-[65px] border-b-[1px] w-full border-[#D1D5DB] items-center text-center">
          <div className="w-[14.2%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Date of Cancellation
          </div>
          <div className="w-[14.2%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Product Name
          </div>
          <div className="w-[14.2%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Quantity
          </div>
          <div className="w-[14.2%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Original Work Order No. (FROM)
          </div>
          <div className="w-[14.2%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            New Work Order No. (TO)
          </div>
          <div className="w-[14.2%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Reason
          </div>
          <div className="w-[14.2%] flex justify-center items-center h-full  text-[16px] text-[#6B7280] font-bold">
            Status
          </div>
        </div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className={`flex justify-between  items-center min-h-[41px] bg-[#FFFFFF] ${index === 1 ? "" : "border-b-[1px] border-[#D1D5DB]"} `}
          >
            <div className="w-[14.2%] flex justify-center items-center py-2 h-full border-r-[1px] border-[#D1D5DB] ">
              23-10-01
            </div>
            <div className="w-[14.2%] flex justify-center items-center py-2 h-full border-r-[1px] border-[#D1D5DB] ">
              Material A
            </div>
            <div className="w-[14.2%] flex justify-center items-center  py-2 h-full border-r-[1px] border-[#D1D5DB]">
              10
            </div>
            <div className="w-[14.2%] flex justify-center items-center py-2  h-full border-r-[1px] border-[#D1D5DB]">
              WO-123
            </div>
            <div className="w-[14.2%] flex justify-center items-center py-2   h-full border-r-[1px] border-[#D1D5DB]">
              Wo-456
            </div>
            <div className="w-[14.2%] flex justify-center items-center py-2  h-full border-r-[1px] border-[#D1D5DB]">
              Not Needed
            </div>
            <div className="w-[14.2%] flex justify-center items-center  py-2 h-full bg-[#FFCC00]">
              Due for Re-procurement 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

