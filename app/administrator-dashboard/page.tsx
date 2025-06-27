import Link from "next/link"
export default function(){
    return(
        <div className="h-full w-full flex items-start justify-center mt-[100px]">
            <div className="w-[1133px] h-[333px] flex  gap-5 bg-[#ffffff] flex-col p-7 rounded-[8px]">
            <div className="font-bold text-[24px]">Welcome, Administrator!</div>
            <div className="flex gap-2 ">
                <div className="w-[334px] h-[92px] flex flex-col items-start justify-center px-5 bg-[#DBEAFE] rounded-[8px] shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_3px_0px_#0000001A,0px_1px_2px_-1px_#0000001A] ">
                    <div className="font-semibold text-[18px]">Total Number of Components:</div>
                    <div className="font-bold text-[24px]">500</div>
                </div>
                <div className="w-[334px] h-[92px] flex flex-col items-start justify-center px-5 bg-[#DCFCE7] rounded-[8px] shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_3px_0px_#0000001A,0px_1px_2px_-1px_#0000001A] ">
                    <div className="font-semibold text-[18px]">Recent User Logins:</div>
                    <div className="font-bold text-[24px]">12i</div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-[30px]">
                <Link href={"/user-account-management"} className="w-[344px] h-[60px] px-5 flex items-center rounded-[8px] bg-[#ffffff] shadow font-semibold text-[18px]">User Account Management</Link>
                <div className="w-[344px] h-[60px] px-5 flex items-center rounded-[8px] bg-[#ffffff] shadow font-semibold text-[18px]">Product Price Comparison Master</div>
                <div className="w-[344px] h-[60px] px-5 flex items-center rounded-[8px] bg-[#ffffff] shadow font-semibold text-[18px]">Rejected/Scrap Material List</div>
            </div>
        </div>
        </div>
        
    )
}