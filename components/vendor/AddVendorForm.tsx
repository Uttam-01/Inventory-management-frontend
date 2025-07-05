"use client";
import { useAddVendors } from "@/lib/api/useAddVendors";
import { vendorSchema } from "@/lib/schemas";
import { useState } from "react";
import InputBox from "./InputBox";
import TextAreaBox from "./TextAreaBox";
import VendorInstructions from "./VendorInstructions";
import Link from "next/link";

export default function AddVendorForm() {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const addVendorMutation = useAddVendors();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
    const result = vendorSchema.safeParse(formData);

    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
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
    <form onSubmit={onSubmit}>
      <VendorInstructions />
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-8">
        <InputBox name="name" label="Vendor Name" placeholder="Enter Vendor Name" error={formErrors.name} />
        <InputBox name="companyName" label="Vendor Firm Name" placeholder="Vendor Firm Name" error={formErrors.companyName} />
        <InputBox name="phoneNumber" label="Contact No. 1" placeholder="Contact No. 1" error={formErrors.phoneNumber} />
        <InputBox name="alternateNumber" label="Contact No. 2" placeholder="Contact No. 2 (Optional)" error={formErrors.alternateNumber} />
        <InputBox name="gstNumber" label="GST No" placeholder="GST No (Optional)" error={formErrors.gstNumber} />
        <InputBox name="country" label="Country" placeholder="India" error={formErrors.country} />
        <InputBox name="state" label="State" placeholder="State" error={formErrors.state} />
        <InputBox name="city" label="City" placeholder="City" error={formErrors.city} />
        <InputBox name="panNumber" label="Pan Number" placeholder="Pan Number" error={formErrors.panNumber} />
        <InputBox name="aadhaarNumber" label="Aadhaar Number" placeholder="Aadhaar Number" error={formErrors.aadhaarNumber} />
        <InputBox name="bankName" label="Bank Name" placeholder="Bank Name" error={formErrors.bankName} />
        <InputBox name="accountHolderName" label="Account Holder Name" placeholder="Account Holder Name" error={formErrors.accountHolderName} />
        <InputBox name="accountNumber" label="Account Number" placeholder="Account Number" error={formErrors.accountNumber} />
        <InputBox name="ifscCode" label="IFSC Code" placeholder="IFSC Code" error={formErrors.ifscCode} />
        <TextAreaBox name="address" label="Address" placeholder="Address (Optional)" />
        <TextAreaBox name="remarks" label="Remarks" placeholder="Remarks (Optional)" />
      </div>

      <div className="w-full flex h-[42px] items-center justify-end gap-4 mt-[25px]">
        <Link href="/vendor-management" className="border border-[#6B7280] text-[#6B7280] rounded-[8px] w-[81px] text-center text-[16px]">Cancel</Link>
        <button type="submit" className="h-[42px] rounded-[8px] w-[154px] text-white bg-[#0F4C81]">
          {addVendorMutation.isPending ? "Saving..." : "Save Vendor"}
        </button>
      </div>
    </form>
  );
}
