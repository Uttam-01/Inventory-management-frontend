

function InputBox(e: { label: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input
        type="text"
        placeholder={e.placeholder}
        className="h-[41px] w-[660px] border-[1px] border-[#E5E7EB] px-3 rounded-[8px]"
      />
    </div>
  );
}

export default function () {
  return (
    <div className=" mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
      <div className="text-[#0F4C81] font-bold text-[20px]">
        Material Rejected / Scrap
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
        Log any materials that need to be removed from stock due to rejection or
        scrapping.
      </div>
      <div>
        <div className="text-[#343A40] text-[18px] font-bold mb-0.5 mt-3">
          Record New Material Entry
        </div>
        <form action="" className="flex flex-wrap gap-y-5 justify-between w-full">
          <InputBox label="Product Selection" placeholder="" />
          <InputBox label="Quantity" placeholder="" />
          <InputBox label="Type" placeholder="" />
          <InputBox label="Vendor" placeholder="" />
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
              Reason
            </label>
            <input
              type="text"
              placeholder=""
              className="h-[82px] w-full border-[1px] border-[#E5E7EB] px-3 rounded-[8px]"
            />
          </div>
          <InputBox label="Date" placeholder="" />
        </form>
      </div>
      <div className=" h-[42px] mt-6 rounded-[8px] w-Full  text-[#FFFFFF] bg-[#DC2626] text-[16px] text-emoji font-normal flex items-center justify-center">
        Record Rejected/Scrap
      </div>
      <div className="text-[#343A40] text-[18px] font-bold  mt-6">
        Recent Rejected/Scrap Entries
      </div>

      <div className="border-[1px] rounded-[6px] border-[#D1D5DB] mt-1 mb-6">
        <div className="flex justify-center bg-[#E5E7EB] h-[41px] border-b-[1px] border-[#D1D5DB] items-center">
          <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Date
          </div>
          <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Material Name
          </div>
          <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Quantity
          </div>
          <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Type  
          </div>
          <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB] text-[16px] text-[#6B7280] font-bold">
            Vendor
          </div>
          
          <div className="w-[30%] flex justify-center items-center   text-[16px] text-[#6B7280] font-bold h-full">
            Reason
          </div>
        </div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className={`flex justify-evenly  items-center h-[41px] ${
              index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F3F4F6]"
            }  ${index === 1 ? "" : "border-b-[1px] border-[#D1D5DB]"} `}
          >
            <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              23-01-01
            </div>
            <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              Material 1
            </div>
            <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              15 Kg
            </div>
            <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              Scrap
            </div>
            <div className="w-[14%] flex justify-center items-center h-full border-r-[1px] border-[#D1D5DB]">
              Vendor 1
            </div>

            <div className="w-[30%] flex justify-center items-center h-full">
              Quality Issues
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
