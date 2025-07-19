import RoleProtected from "@/components/RoleProtection";
import AddButton from "@/components/ui/Add";

function InputBox(e: { label: string; placeholder: string }) {
  return (
    <div className="relative flex flex-col">
      {/* <label htmlFor="" className="text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label> */}
      <input
        className="h-[50px] w-[221px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
        type="text"
        placeholder={e.placeholder}
      />
    </div>
  );
}

export default function () {
  return (
    <RoleProtected allowedRoles={["EMPLOYEE"]}>
      <div className=" mx-auto flex flex-col bg-[#ffffff] gap-8 rounded-[8px] p-8 justify-start shadow">
        <div className="text-[#0F4C81] font-bold text-[20px]">
          Bill of Materials (BOM)
        </div>
        <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] text-[14px] font-normal  font-emoji h-[54px] items-center">
          This screen allows for the aggregation and breakdown of costs
          associated with the selected work order.
        </div>
        <div className="flex justify-start gap-10 items-center">
          Select work Order:
          <div className="relative h-[50px] w-full flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
            <input
              type="text"
              placeholder="Search Machines..."
              className="h-[50px] w-full px-10 rounded-[6px]"
            />
          </div>
        </div>
        <div className="text-[20px] font-bold ">Material Costs</div>
        <div className="flex flex-col border-[1px] border-[#D1D5DB]">
          <div className="flex w-fill border-b-[1px] border-[#D1D5DB] h-[41px] text-[16px] font-bold">
            <div className="w-[16.6%]   border-r-[1px] border-[#D1D5DB] flex items-center justify-center ">
              Material Name
            </div>
            <div className="w-[16.6%]   border-r-[1px] border-[#D1D5DB] flex items-center justify-center">
              Date
            </div>
            <div className="w-[16.6%]   border-r-[1px] border-[#D1D5DB] flex items-center justify-center">
              Quantity
            </div>
            <div className="w-[16.6%]   border-r-[1px] border-[#D1D5DB] flex items-center justify-center">
              Unit
            </div>
            <div className="w-[16.6%]   border-r-[1px] border-[#D1D5DB] flex items-center justify-center">
              Unit Price
            </div>
            <div className="w-[16.6%]  flex items-center justify-center ">
              Total Material Cost
            </div>
          </div>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className={`flex items-center h-[64px] bg-[#ffffff] text-[16px] font-normal border-b-[1px] border-[#D1D5DB]`}
            >
              <div className="w-[16.6%] h-[64px]   border-r-[1px] border-[#D1D5DB] flex items-center justify-center">
                Material A
              </div>
              <div className="w-[16.6%]  h-[64px]  border-r-[1px] border-[#D1D5DB] flex items-center justify-center">
                2023-10-01
              </div>
              <div className="w-[16.6%]  h-[64px]  border-r-[1px] border-[#D1D5DB] flex items-center justify-center">
                10
              </div>
              <div className="w-[16.6%] h-[64px]  border-r-[1px] border-[#D1D5DB] flex items-center justify-center">
                kg
              </div>
              <div className="w-[16.6%]  h-[64px]  border-r-[1px] border-[#D1D5DB] flex items-center justify-center">
                ₹100.00
              </div>
              <div className="w-[16.6%] h-[64px] flex items-center justify-center ">
                ₹1000.00
              </div>
            </div>
          ))}
          <div className="flex h-[64px] w-full">
            <div className="w-[83.4%] flex justify-end items-center pr-3 text-[16px] font-bold">
              Material Subtotal:{" "}
            </div>
            <div className="w-[16.6%] flex justify-start items-center border-l-[1px] border-[#D1D5DB] mr-[7px] pl-3 text-[16px] font-bold">
              ₹1000.00{" "}
            </div>
          </div>
        </div>

        <div className="text-[20px]  font-bold ">Additionals Costs</div>
        <div className="flex gap-4 h-[42px] items-center justify-start">
          <InputBox label="" placeholder="Name" />
          <InputBox label="" placeholder="Description" />
          <InputBox label="" placeholder="Hours" />
          <InputBox label="" placeholder="Amount" />
          <AddButton text="Add" to="/" />
        </div>
        <div className="bg-[#F3F4F6] h-[80px] flex flex-col items-start justify-center px-4">
          <div className="font-emoji font-normal text-[16px]">
            Labour (Ramesh): ₹1,200.00
          </div>
          <div className="font-emoji font-normal text-[16px]">
            Transport: ₹500.00
          </div>
        </div>
        <div className="w-full flex justify-end font-bold text-[16px] rounded-[4px] -mt-[20px]">
          Additional Costs Subtotal: ₹1,700.00
        </div>
        <div className="w-full flex justify-end font-bold text-[24px] text-[#0F4C81] bg-[#E0F2F7] h-[80px] items-center pr-6 rounded-[4px]">
          Grand Total Cost: ₹3,700.00
        </div>
        <div className="w-full flex justify-end font-bold text-[16px]">
          <button className="bg-[#6B7280] rounded-[4px] h-[40px] w-[140px] flex items-center justify-center text-[#FFFFFF] font-normal font-emoji">
            {" "}
            Get Print
          </button>
        </div>
      </div>
    </RoleProtected>
  );
}
