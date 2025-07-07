"use client";

import { useAddVendors } from "@/lib/api/vendorApi/useAddVendors";
import { vendorSchema } from "@/lib/schemas";
import { useState } from "react";
import Link from "next/link";
import FormTextArea from "./FormTextArea";
import InputBox from "./InputBox";

export default function VendorForm() {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const addVendorMutation = useAddVendors();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

    const result = vendorSchema.safeParse(formData);
    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    addVendorMutation.mutate(result.data);
  };

  if (addVendorMutation.isSuccess) return <div>Vendor saved!</div>;
  if (addVendorMutation.isError) return <div>Error saving vendor.</div>;

  return (
    <div
      className="w-[766px] mx-auto p-8 bg-[#ffffff] rounded-[8px]"
      style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}
    >
      <div className="text-[#0F4C81] font-bold text-[20px]">Add New Vendor</div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[94px] items-center">
        Define new vendor details or update existing information. Comprehensive vendor records help streamline procurement and quality control.
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-x-6 gap-y-8 mt-[35px]">
          <InputBox name="name" label="Vendor Name" placeholder="Enter Vendor Name" error={formErrors.name} />
          <InputBox name="companyName" label="Vendor Firm Name" placeholder="Vendor Firm Name" error={formErrors.companyName} />
          <InputBox name="phoneNumber" label="Contact No. 1" placeholder="Contact No. 1" error={formErrors.phoneNumber} />
          <InputBox name="alternateNumber" label="Contact No. 2" placeholder="Contact No. 2 (Optional)" error={formErrors.alternateNumber} />
          <InputBox name="gstNumber" label="GST No" placeholder="GST No (Optional)" error={formErrors.gstNumber} />
          <InputBox name="country" label="Country" placeholder="India" error={formErrors.country} />
          <InputBox name="state" label="State" placeholder="State" error={formErrors.state} />
          <InputBox name="city" label="City" placeholder="City" error={formErrors.city} />
          <InputBox name="panNumber" label="Pan Number" placeholder="Pan Number (Optional)" error={formErrors.panNumber} />
          <InputBox name="aadhaarNumber" label="Aadhaar Number" placeholder="Aadhaar Number (Optional)" error={formErrors.aadhaarNumber} />
          <InputBox name="bankName" label="Bank Name" placeholder="Bank Name (Optional)" error={formErrors.bankName} />
          <InputBox name="accountHolderName" label="Account Holder Name" placeholder="Account Holder Name (Optional)" error={formErrors.accountHolderName} />
          <InputBox name="accountNumber" label="Account Number" placeholder="Account Number (Optional)" error={formErrors.accountNumber} />
          <InputBox name="ifscCode" label="IFSC Code" placeholder="IFSC Code (Optional)" error={formErrors.ifscCode} />
          <FormTextArea name="address" label="Address" placeholder="Address (Optional)" error={formErrors.address} />
          <FormTextArea name="remarks" label="Remarks" placeholder="Remarks (Optional)" error={formErrors.remarks} />
        </div>

        <div className="w-full flex h-[42px] items-center justify-end gap-4 mt-[25px]">
          <Link
            href={"/vendor-management"}
            className="border-[#6B7280] h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px] text-[#6B7280] text-[16px] font-normal flex items-center justify-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="h-[42px] hover:cursor-pointer rounded-[8px] w-[154px] text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center"
          >
            {addVendorMutation.isPending ? "Saving..." : "Save Vendor"}
          </button>
        </div>
      </form>
    </div>
  );
}
