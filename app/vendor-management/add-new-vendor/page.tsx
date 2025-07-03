"use client";
import Delete from "@/components/ui/Delete";
import AddButton from "@/components/ui/Add";
import axios from "axios";
import { headers } from "next/headers";

function InputBox(e: { label: string; placeholder: string; name: string }) {
  return (
    <div className="relative flex flex-col">
      <label htmlFor="" className="text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input
        className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
        type="text"
        placeholder={e.placeholder}
        name={e.name}
      />
    </div>
  );
}

export default function () {
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

      <form onSubmit={onSubmit}>
        <div className="mt-[25px]">
          <div className="flex flex-wrap gap-x-6 gap-y-8 mt-[10px]">
            <InputBox
              name="name"
              label="Vendor Name"
              placeholder="Enter Vendor Name"
            />
            <InputBox
              name="companyName"
              label="Vendor Firm Name"
              placeholder="Vendor Firm Name"
            />
            <InputBox
              name="phoneNumber"
              label="Contact No. 1"
              placeholder="Contact No. 1"
            />
            <InputBox
              name="alternateNumber"
              label="Contact No. 2"
              placeholder="Contact No. 2 (Optional)"
            />
            <InputBox
              name="gstNumber"
              label="GST No"
              placeholder="GST No (Optional)"
            />
            <InputBox name="country" label="Country" placeholder="India" />
            <InputBox name="state" label="State" placeholder="State" />
            <InputBox name="city" label="City" placeholder="City" />
            <InputBox
              name="panNumber"
              label="Pan Number"
              placeholder="Pan Number"
            />
            <InputBox
              name="aadhaarNumber"
              label="Aadhaar Number"
              placeholder="Aadhaar Number"
            />
            <InputBox
              name="bankName"
              label="Bank Name"
              placeholder="Bank Name"
            />
            <InputBox
              name="accountHolderName"
              label="Account Holder Name"
              placeholder="Account Holder Name"
            />
            <InputBox
              name="accountNumber"
              label="Account Number"
              placeholder="Account Number"
            />
            <InputBox
              name="ifscCode"
              label="IFSC Code"
              placeholder="IFSC Code"
            />
            <div className="relative flex flex-col">
              <label
                htmlFor=""
                className="text-[#343A40] text-[14px] font-normal"
              >
                Address
              </label>
              <textarea
                name="address"
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
                name="remarks"
                className="h-[98px] resize-none w-[338px] border-[1px] border-[#D1D5DB] placeholder:align-top pt-2   rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                placeholder="Remarks (Optional)"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex h-[42px] items-center justify-end gap-4 mt-[25px]">
          <button
            type="button"
            className="border-[#6B7280] h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px]  text-[#6B7280] text-[16px] font-normal flex items-center justify-center"
          >
            Cancel
          </button>
          <button className=" h-[42px]  rounded-[8px] w-[154px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
            Save Vendor
          </button>
        </div>
      </form>
    </div>
  );
}

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const payload = Object.fromEntries(formData.entries());
  console.log(formData);
  const res = await axios.request({
    method: "POST",
    url: "http://31.97.61.138:8080/api/v1/vendor",
    data: payload,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmtpdGthcm9kaXlhNkBnbWFpbC5jb20iLCJyb2xlcyI6WyJTVVBFUl9BRE1JTiJdLCJpYXQiOjE3NTE1NDU5MzUsImV4cCI6MTc1MTU1MzEzNX0.ngWd0Dt7JQIAKBDZssiwEI-QuKPGOGZ_2UMZmMRpi1I",
    },
    
  });
};
