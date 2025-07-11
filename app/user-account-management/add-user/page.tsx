"use client";

import RoleProtected from "@/components/RoleProtection";
import { useAddComponents } from "@/lib/api/componentApi/useAddComponents";
import { useAddUser } from "@/lib/api/userApi/useAddUser";
import { componentSchema } from "@/lib/schemas/component.schema";
import { userSchema } from "@/lib/schemas/user.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function InputBox(e: {
  label: string;
  placeholder: string;
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
    </div>
  );
}

export default function () {
  const router = useRouter();
  const roles = [
    { value: "SUPER_ADMIN", label: "Super Admin" },
    { value: "ADMIN", label: "Admin" },
    { value: "MANAGER", label: "Store Manager" },
    { value: "EMPLOYEE", label: "BOM" },
  ];
  const [open, setOpen] = useState<boolean>(false)

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const addUserMutation = useAddUser();
  useEffect(() => {
    if (addUserMutation.isSuccess) {
      const timeout = setTimeout(() => {
        router.push("/user-account-management");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [addUserMutation.isSuccess]);
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    const finalFormData ={
      ...formData,
      roleName :  selectedRoles,
    }
    console.log(finalFormData);

    const result = userSchema.safeParse(finalFormData);
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
    addUserMutation.mutate(result.data);
  }
  const toggleRole = (value: string) => {
    setSelectedRoles((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN"]}>
      <div
        className="w-[766px] mx-auto p-8 bg-[#ffffff] rounded-[8px]"
        style={{ boxShadow: "0px 10px 15px -3px #0000001A" }}
      >
        <div className="text-[#0F4C81] font-bold text-[20px]">Add New User</div>
        <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[58px] items-center">
          This section allows you to add a new user.
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mt-[25px]">
            <div className="flex flex-wrap gap-x-6 gap-y-8 mt-[10px]">
              <InputBox
                name="name"
                label="Full Name"
                placeholder=""
                error={formErrors.name}
              />
              <div className="relative w-[338px]">
                <div className="text-sm text-[#343A40] mb-1">Role</div>
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="border-[1px] border-[#D1D5DB]  px-3 py-2 w-full rounded-[6px] shadow-sm bg-white text-left"
                >
                  {selectedRoles.length > 0
                    ? selectedRoles.join(", ")
                    : "Select roles"}
                </button>

                {open && (
                  <div className="absolute z-10 mt-1 border-[1px] border-[#D1D5DB]  rounded-[6px] bg-white w-full shadow-lg">
                    {roles.map((role) => (
                      <label
                        key={role.value}
                        className="block px-3 py-2 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRoles.includes(role.value)}
                          onChange={() => toggleRole(role.value)}
                          className="mr-2"
                        />
                        {role.label}
                      </label>
                    ))}
                  </div>
                )}
                {formErrors.roleName && (
                  <span className="text-red-500 text-xs">
                    {formErrors.roleName}
                  </span>
                )}
              </div>

              <div className="relative flex flex-col">
                <label
                  htmlFor=""
                  className="text-[#343A40] text-[14px] font-normal"
                >
                  Password
                </label>
                <input
                  name="password"
                  className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                  type="text"
                  placeholder=""
                  defaultValue=""
                />
                {formErrors.password && (
                  <span className="text-red-500 text-xs">
                    {formErrors.password}
                  </span>
                )}
              </div>

              <InputBox
                name="phoneNumber"
                label="Phone Number"
                placeholder=""
                error={formErrors.phoneNumber}
              />
              <InputBox
                name="email"
                label="Email"
                placeholder=""
                error={formErrors.email}
              />
              <InputBox
                name="dob"
                label="Date of Birth"
                placeholder=""
                error={formErrors.dob}
              />
              <div className="relative flex flex-col">
                <div className="text-[#343A40] text-[14px] font-normal">
                  Gender
                </div>
                <select
                  className="h-[50px] w-[338px] border-[1px] border-[#D1D5DB]  rounded-[6px] px-3 shadow-[0px_0px_0px_0px_#0000001A,0px_0px_0px_0px_#0000001A,0px_1px_2px_0px_#0000000D]"
                  name="gender"
                  id=""
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                {formErrors.gender && (
                  <span className="text-red-500 text-xs">
                    {formErrors.gender}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex h-[42px] items-center justify-between gap-4 mt-[25px]">
            {addUserMutation.isSuccess && (
              <div className="text-green-600 w-full">
                User Added Successfully.
              </div>
            )}
            {addUserMutation.isError && <div>Error adding User.</div>}
            <div className="w-full flex h-[42px] items-center justify-end gap-4 ">
              <Link
                href="/user-account-management"
                className="border-[#6B7280] h-[42px] text-emoji border-[1px] rounded-[8px] w-[81px]  text-[#6B7280] text-[16px] font-normal flex items-center justify-center"
              >
                Cancel
              </Link>
              <button className="hover:cursor-pointer h-[42px]  rounded-[8px] w-[154px]  text-[#FFFFFF] bg-[#0F4C81] text-[16px] text-emoji font-normal flex items-center justify-center">
                Add User
              </button>
            </div>
          </div>
        </form>
      </div>
    </RoleProtected>
  );
}
