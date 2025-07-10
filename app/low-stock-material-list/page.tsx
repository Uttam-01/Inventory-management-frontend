import { useLowStock } from "@/lib/api/useLowStock";

export default function () {


  // const {data, isLoading , error} = useLowStock();
  // if(isLoading) return <div>Loading....</div>
  // if(error) return <div>Error loading loaw stock Material List</div>
  return (
    <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
      <div className="text-[#0F4C81] font-bold text-[20px]">
        Low Stock Material List
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
        This report highlights materials that are currently low in stock and require immediate procurement.
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
          <div className="w-[20%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000] border-r-[1px] border-[#E5E7EB]">Product Name</div>
          <div className="w-[20%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  border-r-[1px] border-[#E5E7EB]">Category</div>
          <div className="w-[20%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  border-r-[1px] border-[#E5E7EB]">Current Stock</div>
          <div className="w-[20%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  border-r-[1px] border-[#E5E7EB]">Min Stock</div>
          <div className="w-[20%] items-center h-full flex justify-center font-bold text-[16px] text-[#000000]  ">Diffrence</div>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`flex justify-evenly  items-center h-[41px] ${
              index === 3 ? "" : "border-b-[1px] border-[#E5E7EB]"
            }`}
          >
            <div className="w-[20%] flex justify-center items-center h-full bg-[#FEE2F2] border-r-[1px] border-[#E5E7EB] border-l-[3px] border-l-[#DC3545]">Material A</div>
            <div className="w-[20%] flex justify-center items-center h-full bg-[#FEE2F2] border-r-[1px] border-[#E5E7EB]">Category 1</div>
            <div className="w-[20%] flex justify-center items-center h-full bg-[#FEE2F2] border-r-[1px] border-[#E5E7EB]">3</div>
            <div className="w-[20%] flex justify-center items-center h-full bg-[#FEE2F2] border-r-[1px] border-[#E5E7EB]">10</div>
            <div className="w-[20%] flex justify-center items-center h-full bg-[#FEE2F2]  text-[#DC3545]">-7</div>
          </div>
        ))}
      </div>
    </div>
  );
}
