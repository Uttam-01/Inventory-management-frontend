"use client";

import RoleProtected from "@/components/RoleProtection";
import { useAddComponents } from "@/lib/hooks/componentApi/useAddComponents";
import { componentSchema } from "@/lib/schemas/component.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function InputBox(e: {
  label: string;
  placeholder: string;
  button: boolean;
  name: string;
  error?: string;
  defaultValue?: number;
}) {
  return (
    <div className="relative flex flex-col">
      <label htmlFor="" className="text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input
        name={e.name}
        className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
        type="text"
        placeholder={e.placeholder}
        defaultValue={e.defaultValue}
      />
      {e.error && <span className="text-red-500 text-xs">{e.error}</span>}
      {e.button === true ? (
        <button className="absolute right-3 top-8">
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
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default function () {
  const router = useRouter();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const addComponentMutation = useAddComponents();
  useEffect(() => {
    if (addComponentMutation.isSuccess) {
      const timeout = setTimeout(() => {
        router.push("/inventory/component-management");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [addComponentMutation.isSuccess]);
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    console.log(formData);
    const result = componentSchema.safeParse(formData);
    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFormErrors(errors);
      console.log(errors);
      return;
    }
    console.log(formErrors);

    setFormErrors({});
    addComponentMutation.mutate(result.data);
  }
  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
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
        <form onSubmit={handleFormSubmit}>
          <div className="mt-[25px]">
            <div className="flex flex-wrap gap-x-6 gap-y-8 mt-[10px]">
              <InputBox
                name="name"
                label="Component Name"
                placeholder="Enter Component Name"
                button={false}
                error={formErrors.name}
              />
              <InputBox
                name="category"
                label="Category"
                placeholder="Select Category"
                button={false}
                error={formErrors.category}
              />
              <InputBox
                name="subCategory"
                label="Sub Category"
                placeholder="Select Sub Category"
                button={false}
                error={formErrors.sub}
              />
              <InputBox
                name="locationInStore"
                label="Location in Store"
                placeholder="Enter Location"
                button={false}
                error={formErrors.locationInStore}
              />
              <div className="flex flex-col">
                <label
                  className="text-[#343A40] text-[14px] font-normal"
                  htmlFor=""
                >
                  Units
                </label>
                <select
                  name="units"
                  id=""
                  className="h-[50px]  w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                >
                  <option
                    className="h-[50px]  w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3"
                    value="KG"
                  >
                    Kilogram
                  </option>
                  <option value="METER">Meter</option>
                  <option value="INCH">Inch</option>
                  <option value="FOOT">Feet</option>
                  <option value="PIECE">Number of Items</option>
                </select>
                {formErrors.units && <span className="text-red-500 text-xs">{formErrors.units}</span>}
              </div>

              <InputBox
                error={formErrors.dimension}
                name="dimension"
                label="Dimensions"
                placeholder=""
                button={false}
              />
              <InputBox
                name="minimumStock"
                label="Minimum Stock"
                placeholder="Enter Minimum Stock"
                button={false}
                error={formErrors.minimumStock}
                defaultValue={1}
              />
              <InputBox
                name="availableQuantity"
                label="Available Stock"
                placeholder="Enter Available Stock"
                button={false}
                defaultValue={0}
                error={formErrors.availableQuantity}
              />
              <div className="relative flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-[#343A40] text-[14px] font-normal"
                >
                  Description
                </label>
                <input
                  name="description"
                  className="h-[50px] resize-y w-full border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                  type="text"
                  placeholder=""
                />
                {formErrors.description && <span className="text-red-500 text-xs">{formErrors.description}</span>}
              </div>
            </div>
          </div>

          <div className="w-full flex h-[42px] items-center justify-between gap-4 mt-[25px]">
            {addComponentMutation.isSuccess && (
              <div className="text-green-600 w-full">
                Component Added Successfully.
              </div>
            )}
            {addComponentMutation.isError && <div>Error adding machine.</div>}
            <div className="w-full flex h-[42px] items-center justify-end gap-4 ">
              <Link
                href="/inventory/component-management"
                className="border-[#6B7280] h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px]  text-[#6B7280] text-[16px] font-normal flex items-center justify-center"
              >
                Cancel
              </Link>
              <button className="hover:cursor-pointer h-[42px]  rounded-[8px] w-[154px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
                Save Component
              </button>
            </div>
          </div>
        </form>
      </div>
    </RoleProtected>
  );
}
