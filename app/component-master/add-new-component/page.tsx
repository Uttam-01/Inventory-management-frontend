import Delete from "@/components/ui/Delete";
import AddButton from "@/components/ui/Add";

function InputBox(e: { label: string, placeholder: string, button: boolean }) {
  return (
    <div className="relative flex flex-col">
      <label htmlFor="" className="text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input
        className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
        type="text"
        placeholder={e.placeholder}
      />
      {
        e.button ===  true ? <button className="absolute right-3 top-8">
        <svg
          width="19"
          height="24"
          viewBox="0 0 19 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 12.5H11V8C11 7.44781 10.5522 7 10 7H9C8.44781 7 8 7.44781 8 8V12.5H3.5C2.94781 12.5 2.5 12.9478 2.5 13.5V14.5C2.5 15.0522 2.94781 15.5 3.5 15.5H8V20C8 20.5522 8.44781 21 9 21H10C10.5522 21 11 20.5522 11 20V15.5H15.5C16.0522 15.5 16.5 15.0522 16.5 14.5V13.5C16.5 12.9478 16.0522 12.5 15.5 12.5Z"
            fill="#6B7280"
          />
        </svg>
      </button> :""
      }
      
    </div>
  );
}

function AddNewComponent() {
  return (
    <div
      className="w-[766px] mx-auto p-8 bg-[#ffffff] rounded-[8px]"
      style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}
    >
      <div className="text-[#0F4C81] font-bold text-[20px]">
        Add New Component
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[58px] items-center">
        Please note that admin approval is required for new component entries.
      </div>
      <div className="mt-[25px]">
        <div className="flex flex-wrap gap-x-6 gap-y-8 mt-[10px]">
          <InputBox
            label="Component Name"
            placeholder="Enter Component Name"
            button={false}
          />
          <InputBox
            label="Category"
            placeholder="Select Category"
            button={true}
          />
          <InputBox
            label="Sub Category"
            placeholder="Select Sub Category"
            button={true}
          />
          <InputBox
            label="Location in Store"
            placeholder="Enter Location"
            button={false}
          />
          <InputBox label="Stock Type" placeholder="" button={false} />
          <InputBox label="Units" placeholder="" button={false} />
          <InputBox
            label="Minimum Stock"
            placeholder="Enter Minimum Stock"
            button={false}
          />
          <InputBox
            label="Opening Stock"
            placeholder="Enter Opening Stock"
            button={false}
          />
        </div>
      </div>

      <div className="w-full flex h-[42px] items-center justify-end gap-4 mt-[25px]">
        <div className="border-[#6B7280] h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px]  text-[#6B7280] text-[16px] font-normal flex items-center justify-center">
          Cancel
        </div>
        <div className=" h-[42px]  rounded-[8px] w-[154px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
          Save Component
        </div>
      </div>
    </div>
  );
}

export default AddNewComponent;
