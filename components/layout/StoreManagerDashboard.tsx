function StoreManagerDashboard() {
  return (
    <div className="w-[1313.44px] my-[100px] mx-auto flex flex-col">
      <div className="w-full flex flex-wrap gap-7">
        <div
          className=" w-[624px] h-[132px]  flex flex-col justify-start pt-3 leading-10 pl-5 items-start shadow-[0px_4px_6px_-1px_#0000001A,0px_2px_4px_-2px_#0000001A]"
          style={{
            background: "linear-gradient(180deg, #E0F2F7 0%, #FFFFFF 100%)",
          }}
        >
          <div className="font-emoji font-normal text-[#6B7280] text-[16px]">
            Low Stock Items:
          </div>
          <div className="text-[#DC3545]  text-[60px] font-bold">
            5
          </div>
        </div>
        <div
          className=" w-[624.8px] h-[132px]  flex flex-col justify-start pt-3 leading-10 pl-5 items-start shadow-[0px_4px_6px_-1px_#0000001A,0px_2px_4px_-2px_#0000001A]"
          style={{
            background: "linear-gradient(180deg, #E0F2F7 0%, #FFFFFF 100%)",
          }}
        >
          <div className="font-emoji font-normal text-[#6B7280] text-[16px]">
            Total Vendors
          </div>
          <div className="text-[#0F4C81]  text-[60px] font-bold">
            3
          </div>
        </div>
        <div
          className=" w-[624.8px] h-[132px]  flex flex-col justify-start pt-3 leading-10 pl-5 items-start shadow-[0px_4px_6px_-1px_#0000001A,0px_2px_4px_-2px_#0000001A]"
          style={{
            background: "linear-gradient(180deg, #E0F2F7 0%, #FFFFFF 100%)",
          }}
        >
          <div className="font-emoji font-normal text-[#6B7280] text-[16px]">
            Active Work Orders:
          </div>
          <div className="text-[#28B463]  text-[60px] font-bold">
            4
          </div>
        </div>
        <div
          className=" w-[624.8px] h-[132px]  flex flex-col justify-start pt-3 leading-10 pl-5 items-start shadow-[0px_4px_6px_-1px_#0000001A,0px_2px_4px_-2px_#0000001A]"
          style={{
            background: "linear-gradient(180deg, #E0F2F7 0%, #FFFFFF 100%)",
          }}
        >
          <div className="font-emoji font-normal text-[#6B7280] text-[16px]">
            Total Materials
          </div>
          <div className="text-[#343A40]  text-[60px] font-bold">
            5
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default StoreManagerDashboard;
