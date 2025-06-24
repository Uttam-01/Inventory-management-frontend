export default function () {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center ">
      <div className="flex flex-col justify-center items-center py-[50px] h-[546px] w-[448px] rounded-[8px] border-[1px] border-[#E0F2F7]  " style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}>
        <div className="text-[#0F4C81] mb-[40px] text-[24px] font-extrabold">
          Login to IMS
        </div>
        <div className="max-w-[336px] mb-[40px] text-[#343A40] font-normal text-[16px] flex items-center flex-col justify-center">
          Enter your credentials to access the Inventory
          <div className="max-w-[336px] text-[#343A40] font-normal text-[16px] flex items-center justify-center">
            Management System.
          </div>
        </div>
        <form className="flex flex-col justify-center items-center " action="">
          <div className="mb-[30px] flex flex-col">
            <label
              className="mb-[5px] text-[#343A40] text-[14px] font-medium"
              htmlFor="username"
            >
              Username or Email
            </label>
            <input 
                style={{ boxShadow: "0px 2px 4px 0px #0000000D" }}  
              className="border-1 border-[#E5E7EB] rounded-[6px] h-[42px] w-[366px] px-4 font-normal text-[16px]"
              placeholder="Enter your username or email"
              type="text"
            />
          </div>
          <div className=" mb-[40px] flex flex-col">
            <label
              className="mb-[5px] text-[#343A40] text-[14px] font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              style={{ boxShadow: "0px 2px 4px 0px #0000000D" }}
              className="border-1 border-[#E5E7EB] rounded-[6px] h-[42px] w-[366px] px-4 font-normal text-[16px]"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <button className="bg-[#0F4C81] text-[#ffffff] rounded-[6px] w-[366px] h-[52px] text-[18px] flex items-center justify-center font-semibold">Log In</button>
        </form>
      </div>
    </div>
  );
}
