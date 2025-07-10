"use client"
import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import Delete from "@/components/ui/Delete";
import { useEffect, useState } from "react";
import { useWorkOrder } from "@/lib/api/wokOrderApi/useWorkOrder";


function WIP(){
    return(
        <button className="bg-[#D4EBF7] h[29px] w-[57px] text-[#0F4C81] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]" >WIP</button>
    )
}
function NotStarted(){
    return(
        <button className="bg-[#E9ECEF] h[29px] w-[143px] text-[#343A40] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]" >Not Started yet</button>
    )
}
function Completed(){
    return(
        <button className="bg-[#D4EDDA] h[29px] w-[111px] text-[#28B463] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]" >Completed</button>
    )
}

function Ordered(){
    return(
        <button className="bg-[#feffb6] h[29px] w-[111px] text-[#28B463] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]" >Ordered</button>
    )
}

function Status(e: {index: number , status : string}){
    return (
        <div className="w-[25%] flex justify-center">
            {e.status === "ORDERED" && <Ordered/>}
            {e.status === "WORK_IN_PROGRESS" && <WIP/>}
            {e.status === "NOT_STARTED_YET" && <NotStarted/>}
            {e.status === "COMPLETED" && <Completed/>}
        </div>
    )
}

// const deleteVendor = useDeleteVendor();
  
  // useEffect(() => setMounted(true), []);
  // const handleDelete = (id: number) => {
  //  deleteVendor.mutateAsync(id)
  //   .then(() => window.location.reload())
  //   .catch(err => console.error("Error deleting Vendor:", err));
  // };



export default function () {
  const [mounted, setMounted] = useState(false);
  useEffect(()=> setMounted(true) , [])
  const { data, isLoading, error } = useWorkOrder();

  if (!mounted) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Vendors.</div>;
  return (
    <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
      <div className="text-[#0F4C81] font-bold text-[20px]">
        Work Order Master
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
        This section contains all active work orders for tracking and management.
      </div>
      <div className="flex justify-between items-center">
        <AddButton to="/work-order-master/add-new-workorder" text="Add New Work Order" />
        <div className="relative h-[50px] w-[444px] flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
          <input
            type="text"
            placeholder="Search By WO No...."
            className="h-[50px] w-[444px] px-10 rounded-[6px]"
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

      <div className="border-[1px] mt-[10px] rounded-[6px] border-[#D1D5DB]">
        <div className="flex justify-center bg-[#E5E7EB] h-[41px] items-center">
          <div className="w-[25%] flex justify-center">WO No</div>
          <div className="w-[25%] flex justify-center">JOB DETAILS</div>
          <div className="w-[25%] flex justify-center">STATUS</div>
          <div className="w-[25%] flex justify-center">ACTIONS</div>
        </div>
        {data.map((item : any, index : number) => (
          <div
            key={index}
            className={`flex justify-evenly  items-center h-[64px] ${
              index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F3F4F6]"
            }`}
          >
            <div className="w-[25%] flex justify-center">{item.orderId}</div>
            <div className="w-[25%] flex justify-center">{item.machineName}</div>
            <Status index={index} status={item.status}/>

            <div className="w-[25%] flex justify-center items-center gap-4">
              <Edit to="/" />
              <Delete to="/"></Delete>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
