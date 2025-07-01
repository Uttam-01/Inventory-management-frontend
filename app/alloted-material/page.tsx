import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import Delete from "@/components/ui/Delete";
import Link from "next/link";

function Active(){
    return(
        <button className="bg-[#DBEAFE] h-[32px] px-5 text-[#2563EB] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]" >Active</button>
    )
}
function Pending(){
    return(
        <button className="bg-[#FEF9C3] h-[32px] px-5  text-[#CA8A04] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]" >Pending</button>
    )
}
function Completed(){
    return(
        <button className="bg-[#DCFCE7] h-[32px] px-5 text-[#16A34A] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]" >Completed</button>
    )
}

function Status(e: {index: number}){
    return (
        <div className="w-[17%] flex justify-center">
            {e.index === 1 ? <Active/>: 
            e.index === 0? <Pending/> : <Completed/>}
        </div>
    )
}

export default function () {
  return (
    <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
      <div className="text-[#0F4C81] font-bold text-[20px]">
        Work Order Master
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
        This section contains all active work orders for tracking and management.
      </div>
      <div className="flex justify-start items-center gap-2.5 my-3">
        <div className="relative h-[42px] w-[223px] flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
          <input
            type="text"
            placeholder="Search..."
            className="h-[42px] w-[223px] px-5 rounded-[6px]"
          />
        </div>
        <div className="relative h-[42px] w-[162px] flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
          <input
            type="text"
            placeholder=""
            className="h-[42px] w-[162px] px-5 rounded-[6px]"
          />
        </div>
        <div className=" h-[42px]  rounded-[8px] w-[100px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
        Sort
      </div>
      </div>

      <div className="border-[1px] mt-[10px] rounded-[6px] w-full border-[#D1D5DB]">
        <div className="flex justify-between bg-[#E5E7EB] w-full h-[41px] items-center px-0">
          <div className="w-[11%] flex justify-center px-0 mx-0">Date </div>
          <div className="w-[11%] flex justify-center">Product Name</div>
          <div className="w-[11%] flex justify-center">Quality</div>
          <div className="w-[11%] flex justify-center">Unit</div>
          <div className="w-[14%] flex justify-center">Work Order Number</div>
          <div className="w-[11%] flex justify-center">Agent</div>
          <div className="w-[14%] flex justify-center">Location in Store</div>
          <div className="w-[17%] flex justify-center">Status of Work Order</div>
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`flex justify-evenly  items-center h-[64px] ${
              index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F3F4F6]"
            }`}
          >
            <div className="w-[11%] flex justify-center">23-10-01</div>
            <div className="w-[11%] flex justify-center">Material 1</div>
            <div className="w-[11%] flex justify-center">20 Kg</div>
            <div className="w-[11%] flex justify-center">Kg</div>
            <div className="w-[14%] flex justify-center">WO 1</div>
            <div className="w-[11%] flex justify-center">Agent 1</div>
            <div className="w-[14%] flex justify-center">Aisle 3</div>
            <Status index={index}/>
          </div>
        ))}
      </div>
    </div>
  );
}
