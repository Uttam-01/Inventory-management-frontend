import { useState } from "react";
function Navbar() {
    const [selected,setSelected] = useState<string>("dashboard")

     return (
        <div>
            <div className="flex  w-full justify-between h-[64px] items-center">
                <div className="text-[#0F4C81] text-[32px] font-bold">
                    Inventory Management System
                </div>
                <div className="flex items-center justify-center gap-3">
                    <div className="text-[#6B7280] text-[14px] font-normal font-emoji">
                        User ID: SM_001
                    </div>
                    <button
                        className="bg-[#343A40] h-[32px] w-[36.61px] rounded-[9999px] flex items-center justify-center"
                        type="button"
                    >
                        <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.39404 8C10.6034 8 12.394 6.20937 12.394 4C12.394 1.79063 10.6034 0 8.39404 0C6.18467 0 4.39404 1.79063 4.39404 4C4.39404 6.20937 6.18467 8 8.39404 8ZM11.194 9H10.6722C9.97842 9.31875 9.20654 9.5 8.39404 9.5C7.58154 9.5 6.81279 9.31875 6.11592 9H5.59404C3.27529 9 1.39404 10.8813 1.39404 13.2V14.5C1.39404 15.3281 2.06592 16 2.89404 16H13.894C14.7222 16 15.394 15.3281 15.394 14.5V13.2C15.394 10.8813 13.5128 9 11.194 9Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="bg-[#CFDBE6] fixed left-0 h-[56px] w-screen  flex box-shadow: 0px 1px 2px 0px #0000000D;">
                <div className="flex w-[1440px] mx-auto items-center justify-evenly">
                    <div onClick={()=> setSelected("dashboard")} className={` text-[16px] ${selected==="dashboard" ? "transition-all font-bold text-[#0F4C81] underline-offset-4 decoration-[#0F4C81] underline decoration-[3px]" : "text-[#343A40] font-medium hover:cursor-pointer"} `}>Dashboard</div>
                    <div onClick={()=> setSelected("machinemaster")} className={` text-[16px] ${selected==="machinemaster" ? "transition-all font-bold text-[#0F4C81] underline-offset-4 decoration-[#0F4C81] underline decoration-[3px]" : "text-[#343A40] font-medium hover:cursor-pointer"} `}>Machine Master</div>
                    <div onClick={()=> setSelected("componentmaster")} className={` text-[16px] ${selected==="componentmaster" ? "transition-all font-bold text-[#0F4C81] underline-offset-4 decoration-[#0F4C81] underline decoration-[3px]" : "text-[#343A40] font-medium hover:cursor-pointer"} `}>Component Master</div>
                    <div onClick={()=> setSelected("vendormaster")} className={` text-[16px] ${selected==="vendormaster" ? "transition-all font-bold text-[#0F4C81] underline-offset-4 decoration-[#0F4C81] underline decoration-[3px]" : "text-[#343A40] font-medium hover:cursor-pointer"} `}>Vendor Master</div>
                    <div onClick={()=> setSelected("workordermaster")} className={` text-[16px] ${selected==="workordermaster" ? "transition-all font-bold text-[#0F4C81] underline-offset-4 decoration-[#0F4C81] underline decoration-[3px]" : "text-[#343A40] font-medium hover:cursor-pointer" } `}>Work Order Master</div>
                    <div onClick={()=> setSelected("materialin")} className={` text-[16px] ${selected==="materialin" ? "transition-all font-bold text-[#0F4C81] underline-offset-4 decoration-[#0F4C81] underline decoration-[3px]" : "text-[#343A40] font-medium hover:cursor-pointer"} `}>Material IN</div>
                    <div onClick={()=> setSelected("materialout")} className={` text-[16px] ${selected==="materialout" ? "transition-all font-bold text-[#0F4C81] underline-offset-4 decoration-[#0F4C81] underline decoration-[3px]" : "text-[#343A40] font-medium hover:cursor-pointer"} `}>Material Out</div>
                    <div onClick={()=> setSelected("allottedmaterial")} className={` text-[16px] ${selected==="allottedmaterial" ? "transition-all font-bold text-[#0F4C81] underline-offset-4 decoration-[#0F4C81] underline decoration-[3px]" : "text-[#343A40] font-medium hover:cursor-pointer"} `}>Allotted Material</div>
            
                </div>
            </div>
            
        </div>
    );
}

export default Navbar;
