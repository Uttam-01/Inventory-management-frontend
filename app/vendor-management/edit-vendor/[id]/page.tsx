"use client";
import { useAddVendors } from "@/lib/api/addVendors";
import { Vendor , vendorSchema } from "@/lib/schemas";
import {useEffect, useState } from "react";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { usePathname } from "next/navigation";
import { authRequest } from "@/lib/api/auth";

function InputBox(e: {
  label: string;
  placeholder: string;
  name: string;
  error?: string;
}) {
  return (
    <div className="relative flex flex-col">
      <label htmlFor="" className="text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input 
        className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
        placeholder={e.placeholder}
        name={e.name}
      />
      {e.error && <span className="text-red-500 text-xs">{e.error}</span>}
    </div>
  );
}


export default function () {
 const pathname = usePathname();
  const [vendorInfo, setVendorInfo] = useState<Vendor>();

  useEffect(() => {
    const getInfo = async () => {
      const pathParts = pathname.split("/").filter(Boolean);
      const vendorId = pathParts[pathParts.length - 1];

      try {
        const data = await authRequest({
          url: `${API_ROUTES.VENDOR}/${vendorId}`,
          method: "GET",
        });

        console.log("Fetched vendor info:", data);
        setVendorInfo(data);
      } catch (err) {
        console.error("Failed to fetch vendor:", err);
      }
    };

    if (pathname) {
      getInfo();
    }
  }, [pathname]);

  console.log(vendorInfo);

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

 
  if (!vendorInfo) return <p>Loading...</p>;

  return (

    <div
      className="w-[766px] mx-auto p-8 bg-[#ffffff] rounded-[8px]"
      style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}
    >
      <div className="text-[#0F4C81] font-bold text-[20px]">Add New Vendor</div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[94px] items-center">
        Update existing vendor's details. Comprehensive
        vendor records help streamline procurement and quality control.
      </div>

      <form onSubmit={onSubmit}>
        <div className="mt-[25px]">
          <div className="flex flex-wrap gap-x-6 gap-y-8 mt-[10px]">
            <InputBox

              name="name"
              label="Vendor Name"
              placeholder={ vendorInfo.name ?? "Enter Vendor Name"}
              error={formErrors.name}
            />
            <InputBox

              name="companyName"
              label="Vendor Firm Name"
              placeholder={vendorInfo.companyName ?? "Vendor Firm Name"}
              error={formErrors.companyName}
            />
            <InputBox
              
              name="phoneNumber"
              label="Contact No. 1"
              placeholder={vendorInfo.phoneNumber.toString() ?? "Contact No. 1"}
              error={formErrors.phoneNumber}
            />
            <InputBox
              
              name="alternateNumber"
              label="Contact No. 2"
              placeholder={vendorInfo.alternateNumber?.toString() ?? ""}
              error={formErrors.alternateNumber}
            />
            <InputBox

              name="gstNumber"
              label="GST No"
              placeholder={vendorInfo.gstNumber ?? "GST No (Optional)"}
              error={formErrors.gstNumber}
            />
            <InputBox

              name="country"
              label="Country"
              placeholder={vendorInfo.country ?? "Country"}
              error={formErrors.country}
            />
            <InputBox

              name="state"
              label="State"
              placeholder={vendorInfo.state ?? "State"}
              error={formErrors.state}
            />
            <InputBox

              name="city"
              label="City"
              placeholder={vendorInfo.city ?? "City"}
              error={formErrors.city}
            />
            <InputBox

              name="panNumber"
              label="Pan Number"
              placeholder={vendorInfo.panNumber ?? "Pan Number (Optional)"}
              error={formErrors.panNumber}
            />
            <InputBox
              
              name="aadhaarNumber"
              label="Aadhaar Number"
              placeholder={vendorInfo.aadhaarNumber?.toString() ?? ""}
              error={formErrors.aadhaarNumber}
            />
            <InputBox

              name="bankName"
              label="Bank Name"
              placeholder={vendorInfo.bankName ?? "Bank Name (Optional)"}
              error={formErrors.bankName}
            />
            <InputBox

              name="accountHolderName"
              label="Account Holder Name"
              placeholder={vendorInfo.accountHolderName ?? "Account Holder Name (Optional)"}
              error={formErrors.accountHolderName}
            />
            <InputBox
              
              name="accountNumber"
              label="Account Number"
              placeholder={vendorInfo.accountNumber?.toString() ?? "Account Number (Optional)"}
              error={formErrors.accountNumber}
            />
            <InputBox

              name="ifscCode"
              label="IFSC Code"
              placeholder={vendorInfo.ifscCode ?? "IFSC Code (Optional)"}
              error={formErrors.ifscCode}
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
                placeholder={vendorInfo.address ?? "Address (Optional)"}
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
                placeholder={vendorInfo.remarks ?? ""}
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
            {addVendorMutation.isPending ? "Saving..." : "Save Vendor"}
          </button>
        </div>
      </form>
    </div>
  );
}
