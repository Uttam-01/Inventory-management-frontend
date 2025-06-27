import Delete from "@/components/ui/Delete";
import AddButton from "@/components/ui/Add";

function InputBox(e: { label: string; placeholder: string }) {
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
    </div>
  );
}

function AddNewComponent() {
  return (
    <div
      className="w-[766px] mx-auto p-8 bg-[#ffffff] rounded-[8px]"
      style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}
    >
      <div className="text-[#0F4C81] font-bold text-[20px]">Add New Vendor</div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[94px] items-center">
        Define new vendor details or update existing information. Comprehensive
        vendor records help streamline procurement and quality control.
      </div>
      <div className="mt-[25px]">
        <div className="flex flex-wrap gap-x-6 gap-y-8 mt-[10px]">
          <InputBox label="Vendor Name" placeholder="Enter Vendor Name" />
          <InputBox label="Vendor Firm Name" placeholder="Vendor Firm Name" />
          <InputBox label="Contact No. 1" placeholder="Contact No. 1" />
          <InputBox
            label="Contact No. 2"
            placeholder="Contact No. 2 (Optional)"
          />
          <InputBox label="GST No" placeholder="GST No (Optional)" />
          <InputBox label="Country" placeholder="India" />
          <InputBox label="State" placeholder="State" />
          <InputBox label="City" placeholder="City" />
          <div className="relative flex flex-col">
            <label
              htmlFor=""
              className="text-[#343A40] text-[14px] font-normal"
            >
              Address
            </label>
            <textarea
              className="h-[98px] resize-none w-[338px] border-[1px] border-[#D1D5DB] placeholder:align-top pt-2   rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
              
              placeholder="Address (Optional)"
            />
          </div>
          <div className="relative flex flex-col">
            <label
              htmlFor=""
              className="text-[#343A40] text-[14px] font-normal"
            >
              Remarks
            </label>
            <textarea
              className="h-[98px] resize-none w-[338px] border-[1px] border-[#D1D5DB] placeholder:align-top pt-2   rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
              
              placeholder="Remarks (Optional)"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex h-[42px] items-center justify-end gap-4 mt-[25px]">
        <div className="border-[#6B7280] h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px]  text-[#6B7280] text-[16px] font-normal flex items-center justify-center">
          Cancel
        </div>
        <div className=" h-[42px]  rounded-[8px] w-[154px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
          Save Vendor
        </div>
      </div>
    </div>
  );
}

export default AddNewComponent;
