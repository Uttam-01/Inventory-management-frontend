import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import Delete from "@/components/ui/Delete";
import Link from "next/link";
export default function () {
  return (
    <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-10 justify-start shadow ">
      <div className="text-[#0F4C81] font-bold text-[24px]">
        Rejected / Scrap Material
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
        This report contains all materials that have been rejected or scrapped. Please review the details carefully.
      </div>
      <div className="flex justify-between  items-center">
        <div className="relative h-[50px] gap-3 flex items-center justify-center ">
          <input
            type="text"
            placeholder="Search.... "
            className="h-[42px] w-[230px] px-5 border-[#D1D5DB] border-[1px] rounded-[4px]"
          />
          <input
            type="text"
            placeholder=""
            className="h-[42px] w-[230px] px-5 border-[#D1D5DB] border-[1px] rounded-[4px]"
          />
          <input
            type="text"
            placeholder=""
            className="h-[42px] w-[230px] px-5 border-[#D1D5DB] border-[1px] rounded-[4px]"
          />
          <input
            type="text"
            placeholder=""
            className="h-[42px] w-[230px] px-5 border-[#D1D5DB] border-[1px] rounded-[4px]"
          />
        </div>
        <div className=" h-[42px]  rounded-[4px] w-[70px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
          Sort
        </div>
      </div>

      <div className=" mt-[10px] mb-5 rounded-[6px] border-[1px] border-[#D1D5DB] shadow">
          <div className="flex justify-between bg-[#E5E7EB] h-[41px] items-center">
            <div className="w-[16.6%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Material Name</div>
            <div className="w-[16.6%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Quantity </div>
            <div className="w-[16.6%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Type </div>
            <div className="w-[16.6%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Vendor </div>
            <div className="w-[16.6%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Reason</div>
            <div className="w-[16.6%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Date</div>
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`flex justify-between items-center h-[41px] ${index!=4? "border-b-[1px] border-[#D1D5DB]" : ""}`}
            >
              <div className="w-[16.6%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">Material A</div>
              <div className="w-[16.6%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">100</div>
              <div className="w-[16.6%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">Type A</div>
              <div className="w-[16.6%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">Vendor A</div>
              <div className="w-[16.6%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">Quality Issues</div>
              <div className="w-[16.6%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">23-10-01</div>
            </div>
          ))}
        </div>
    </div>
  );
}
