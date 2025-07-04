
function Svg(){
    return(
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.40635 8.99961H11.8438C12.5126 8.99961 12.847 9.80898 12.3751 10.2809L8.65635 13.9996C8.3626 14.2934 7.8876 14.2934 7.59697 13.9996L3.8751 10.2809C3.40322 9.80898 3.7376 8.99961 4.40635 8.99961ZM12.3751 5.71836L8.65635 1.99961C8.3626 1.70586 7.8876 1.70586 7.59697 1.99961L3.8751 5.71836C3.40322 6.19023 3.7376 6.99961 4.40635 6.99961H11.8438C12.5126 6.99961 12.847 6.19023 12.3751 5.71836Z" fill="#4B5563"/>
</svg>

    )
}
export default function () {
  return (
    <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] justify-start ">
      <div className="shadow w-full p-10">
        <div className="text-[#0F4C81] font-bold text-[24px] ">
          Product Price Comparison
        </div>
        <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
          Compare product prices by product or vendor to make informed
          purchasing decisions.
        </div>
        <div className="flex justify-between items-center w-full mt-2 mb-5">
          <div className="shadow  w-[49%]  flex flex-col p-4">
            <div className="text-[#0F4C81] font-bold text-[20px]">
              Compare Prices by Products
            </div>
            <div className="h-[50px] mt-3 mb-10 w-full flex flex-col items-center justify-center ">
              <input
                type="text"
                placeholder="Select Product"
                className="h-[50px] w-full px-5 rounded-[4px] border-[#D1D5DB] border-[1px]"
              />
            </div>
            <div className=" h-[42px] w-[174px]  rounded-[4px] px-4 text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
              Compare Now
            </div>
          </div>
          <div className="shadow  w-[49%]  flex flex-col p-4">
            <div className="text-[#0F4C81] font-bold text-[20px]">
              Purchase History By Vendor
            </div>
            <div className="h-[50px] mt-3 mb-10 flex  w-full items-center justify-between ">
              <input
                type="text"
                placeholder="Select Vendor"
                className="h-[50px] w-[49%] px-5 rounded-[4px] border-[#D1D5DB] border-[1px]"
              />

              <input
                type="text"
                placeholder="Select Date Range"
                className="h-[50px] w-[49%] px-5 rounded-[4px] border-[#D1D5DB] border-[1px]"
              />
            </div>
            <div className=" h-[42px] w-[174px]  rounded-[4px] px-4 text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
              Compare Now
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-10 flex flex-col">
        <div className="font-bold text-[24px] text-[#000000]">Vendor Table</div>
        <div className="flex items-center justify-center w-[140px] h-[40px] rounded-[4px] bg-[#6B7280] text-[#FFFFFF] text-[16px] font-normal my-6">
          Get Print
        </div>

        <div className=" mt-[10px] rounded-[6px] border-[1px] border-[#D1D5DB]">
          <div className="flex justify-between bg-[#E5E7EB] h-[41px] items-center">
            <div className="w-[11%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Vendor Name<Svg/></div>
            <div className="w-[11%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Receiving Date <Svg/></div>
            <div className="w-[11%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Quantity  <Svg/></div>
            <div className="w-[11%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Unit Price <Svg/></div>
            <div className="w-[9%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Gst %<Svg/></div>
            <div className="w-[11%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Packing <Svg/></div>
            <div className="w-[11%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Transport <Svg/></div>
            <div className="w-[9%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">O/H <Svg/></div>
            <div className="w-[15%] flex justify-center items-center text-[#4B5563] text-[16px] font-bold gap-1">Total Effective Price<Svg/></div>
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`flex justify-evenly  items-center h-[41px] ${index!=4? "border-b-[1px] border-[#D1D5DB]" : ""}`}
            >
              <div className="w-[11%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">Vendor A</div>
              <div className="w-[11%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">2023-10-01</div>
              <div className="w-[11%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">100</div>
              <div className="w-[11%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">$10.00</div>
              <div className="w-[9%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">5%</div>
              <div className="w-[11%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">$2.00</div>
              <div className="w-[11%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">$3.00</div>
              <div className="w-[9%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">$1.00</div>
              <div className="w-[15%] flex justify-center items-center text-[#000000] text-[16px] font-normal font-emoji">$16.00</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
