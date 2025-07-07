"use client";

import { useUpdateVendors } from "@/lib/api/vendorApi/useUpdateVendor";
import { Vendor, vendorSchema } from "@/lib/schemas";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { authRequest } from "@/lib/api/auth";
import Link from "next/link";
import InputBox from "./InputBox";
import FormTextArea from "./FormTextArea";

export default function VendorUpdateForm() {
  const pathname = usePathname();
  const [vendorInfo, setVendorInfo] = useState<Vendor>();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const updateVendorMutation = useUpdateVendors();

  useEffect(() => {
    const vendorId = pathname.split("/").filter(Boolean).pop();
    if (!vendorId) return;

    authRequest({ url: `${API_ROUTES.VENDOR}/${vendorId}`, method: "GET" })
      .then(setVendorInfo)
      .catch(console.error);
  }, [pathname]);

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

    const vendorId = pathname.split("/").filter(Boolean).pop();
    if (!vendorId) return;

    updateVendorMutation.mutate({ reqData: result.data, id: Number(vendorId) });
    setFormErrors({});
  };

  if (!vendorInfo) return <p>Loading vendor details...</p>;
  if (updateVendorMutation.isSuccess) return <div>Vendor details updated!</div>;
  if (updateVendorMutation.isError) return <div>Error updating vendor.</div>;

  return (
    <div className="w-[766px] mx-auto p-8 bg-white rounded-[8px]" style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}>
      <div className="text-[#0F4C81] font-bold text-[20px]">Update Vendor</div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal h-[94px] items-center">
        Update existing vendor's details. Comprehensive vendor records help streamline procurement and quality control.
      </div>

      <form onSubmit={onSubmit} className="mt-[25px]">
        <div className="flex flex-wrap gap-x-6 gap-y-8 mt-[10px]">
          <InputBox name="name" label="Vendor Name" placeholder="Enter Vendor Name" value={vendorInfo.name} error={formErrors.name} />
          <InputBox name="companyName" label="Vendor Firm Name" placeholder="Vendor Firm Name" value={vendorInfo.companyName} error={formErrors.companyName} />
          <InputBox name="phoneNumber" label="Contact No. 1" placeholder="Contact No. 1" value={vendorInfo.phoneNumber?.toString()} error={formErrors.phoneNumber} />
          <InputBox name="alternateNumber" label="Contact No. 2" placeholder="Alternate Number (Optional)" value={vendorInfo.alternateNumber?.toString()} error={formErrors.alternateNumber} />
          <InputBox name="gstNumber" label="GST No" placeholder="GST No (Optional)" value={vendorInfo.gstNumber} error={formErrors.gstNumber} />
          <InputBox name="country" label="Country" placeholder="Country" value={vendorInfo.country} error={formErrors.country} />
          <InputBox name="state" label="State" placeholder="State" value={vendorInfo.state} error={formErrors.state} />
          <InputBox name="city" label="City" placeholder="City" value={vendorInfo.city} error={formErrors.city} />
          <InputBox name="panNumber" label="Pan Number" placeholder="Pan Number (Optional)" value={vendorInfo.panNumber} error={formErrors.panNumber} />
          <InputBox name="aadhaarNumber" label="Aadhaar Number" placeholder="Aadhaar Number (Optional)" value={vendorInfo.aadhaarNumber?.toString()} error={formErrors.aadhaarNumber} />
          <InputBox name="bankName" label="Bank Name" placeholder="Bank Name (Optional)" value={vendorInfo.bankName} error={formErrors.bankName} />
          <InputBox name="accountHolderName" label="Account Holder Name" placeholder="Account Holder Name (Optional)" value={vendorInfo.accountHolderName} error={formErrors.accountHolderName} />
          <InputBox name="accountNumber" label="Account Number" placeholder="Account Number (Optional)" value={vendorInfo.accountNumber} error={formErrors.accountNumber} />
          <InputBox name="ifscCode" label="IFSC Code" placeholder="IFSC Code (Optional)" value={vendorInfo.ifscCode} error={formErrors.ifscCode} />
          <FormTextArea name="address" label="Address" placeholder="Address (Optional)" value={vendorInfo.address} error={formErrors.address} />
          <FormTextArea name="remarks" label="Remarks" placeholder="Remarks (Optional)" value={vendorInfo.remarks} error={formErrors.remarks} />
        </div>

        <div className="w-full flex h-[42px] items-center justify-end gap-4 mt-[25px]">
          <Link href="/vendor-management" className="border-[#6B7280] h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px] text-[#6B7280] text-[16px] font-normal flex items-center justify-center">Cancel</Link>
          <button type="submit" className="h-[42px] rounded-[8px] w-[154px] text-white bg-[#0F4C81] text-[16px] font-normal flex items-center justify-center">
            {updateVendorMutation.isPending ? "Saving..." : "Save Vendor"}
          </button>
        </div>
      </form>
    </div>
  );
}
