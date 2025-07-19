import MaterialFlowNav from "@/components/layout/MaterialFlowNav";
import RoleProtected from "@/components/RoleProtection";

export default function () {
  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
      <div className=" mx-auto flex flex-col rounded-[8px]  justify-start">
        <div className=" mx-auto flex flex-col   rounded-[8px] pb-8 justify-start ">
          <MaterialFlowNav />
        </div>

        <div className=" mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
          <div className="text-[#0F4C81] font-bold text-[20px]">
            Cancelled Allocation List
          </div>
          <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
            This report details materials that were previously reserved but are
            now available or reallocated, aiding in re-procurement.
          </div>
          <div className="flex justify-between items-center my-4">
            <div className="relative h-[42px] w-[223px] flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
              <input
                type="text"
                placeholder="Search..."
                className="h-[42px] w-[223px] px-5 rounded-[6px]"
              />
            </div>
          </div>

          <div className="border-[1px] mt-[10px] rounded-[6px] border-[#E5E7EB]">
            <div className="flex justify-center bg-[#FFFFFF] h-[41px] items-center border-b-[1px] border-[#E5E7EB]">
              <div className="w-[14.28%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000] border-r-[1px] border-[#E5E7EB]">
                Date of Cancellation
              </div>
              <div className="w-[14.28%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  border-r-[1px] border-[#E5E7EB]">
                Product Name
              </div>
              <div className="w-[14.28%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  border-r-[1px] border-[#E5E7EB]">
                Quantity
              </div>
              <div className="w-[14.28%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  border-r-[1px] border-[#E5E7EB]">
                Original Work Order No
              </div>
              <div className="w-[14.28%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  border-r-[1px] border-[#E5E7EB]">
                New Work Order No
              </div>
              <div className="w-[14.28%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  border-r-[1px] border-[#E5E7EB]">
                Reason
              </div>
              <div className="w-[14.28%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  ">
                Status
              </div>
            </div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`flex justify-center  items-center h-[41px] ${
                  index === 3 ? "" : "border-b-[1px] border-[#E5E7EB]"
                }`}
              >
                <div className="w-[14.28%] flex justify-center items-center h-full  border-r-[1px] border-[#E5E7EB]">
                  23-10-01
                </div>
                <div className="w-[14.28%] flex justify-center items-center h-full  border-r-[1px] border-[#E5E7EB]">
                  Material A
                </div>
                <div className="w-[14.28%] flex justify-center items-center h-full  border-r-[1px] border-[#E5E7EB]">
                  10
                </div>
                <div className="w-[14.28%] flex justify-center items-center h-full  border-r-[1px] border-[#E5E7EB]">
                  WO-001
                </div>
                <div className="w-[14.28%] flex justify-center items-center h-full  border-r-[1px] border-[#E5E7EB]">
                  WO-002
                </div>
                <div className="w-[14.28%] flex justify-center items-center h-full  border-r-[1px] border-[#E5E7EB]">
                  Not Needed
                </div>
                <div className="w-[14.28%] flex justify-center items-center h-full  border-r-[1px] border-[#E5E7EB]">
                  <div className="h-[25px] px-2 bg-[#FED7AA] text-center flex justify-center items-center text-[14px] text-[#9A3412] rounded-[9999px]">
                    Pending Procurement
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleProtected>
  );
}
