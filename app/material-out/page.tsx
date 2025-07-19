import MaterialFlowNav from "@/components/layout/MaterialFlowNav";
import RoleProtected from "@/components/RoleProtection";

export default function () {
  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
      <div className=" mx-auto  flex flex-col rounded-[8px]  justify-start">
        <div className=" mx-auto flex flex-col   rounded-[8px] pb-8 justify-start ">
          <MaterialFlowNav />
        </div>
        <div className=" mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
          <div className="text-[#0F4C81] font-bold text-[20px]">
            Material IN
          </div>
          <div className="text-[#343A40] text-[18px] font-bold  mt-6">
            Recent Material OUT Entries
          </div>

          <table className="border-[1px] min-w-full rounded-[6px] border-[#D1D5DB] mt-1 mb-6">
            <thead className="flex justify-center bg-[#E5E7EB] h-[41px] border-b-[1px] border-[#D1D5DB] items-center">
              <tr>
                <th className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
                  Date
                </th>
                <th className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
                  Product Name
                </th>
                <th className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
                  Quantity
                </th>
                <th className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
                  Work Order{" "}
                </th>
                <th className="w-[20%] flex justify-center items-center   text-[16px] text-[#6B7280] font-bold h-full">
                  Issued To
                </th>
              </tr>
            </thead>
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className={`flex justify-evenly  items-center h-[41px] min-w-full ${
                  index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F3F4F6]"
                }  ${index === 1 ? "" : "border-b-[1px] border-[#D1D5DB]"} `}
              >
                <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
                  23-01-01
                </div>
                <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
                  Product 1
                </div>
                <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
                  10 Kg
                </div>
                <div className="w-[20%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
                  WO 1
                </div>
                <div className="w-[20%] flex justify-center items-center h-full">
                  Labour 1
                </div>
              </div>
            ))}
          </table>
        </div>
      </div>
    </RoleProtected>
  );
}
