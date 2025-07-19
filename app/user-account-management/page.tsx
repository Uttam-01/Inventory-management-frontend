"use client";
import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import Delete from "@/components/ui/Delete";
import { useEffect, useState } from "react";
import { useUsers } from "@/lib/api/userApi/useUsers";
import RoleProtected from "@/components/RoleProtection";
import GlobalLoader from "@/components/layout/GlobalLoader";

function Status(e: { status: string }) {
  return (
    <div className="w-[20%] flex justify-center">
      <div
        className={`h[29px] px-4 font-emoji text-[16px] font-normal flex items-center justify-center rounded-[4px] ${
          e.status === "ACTIVE"
            ? "bg-[#BBF7D0] text-[#166534]"
            : "bg-[#FECACA] text-[#991B1B]"
        }`}
      >
        {e.status === "ACTIVE" ? "Active" : "Inactive"}
      </div>
    </div>
  );
}

export default function () {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { data, isLoading, error } = useUsers();
  if (!mounted) return null;
  else if (isLoading) return <GlobalLoader />;
  else if (error) return <div>Error loading components.</div>;

  console.log(data);
  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN"]}>
      <div className=" mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
        <div className="text-[#0F4C81] font-bold text-[20px]">
          User Account Management
        </div>
        <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
          This section allows you to manage user accounts effectively.
        </div>
        <div className="flex justify-between items-center">
          <AddButton
            to="/user-account-management/add-user"
            text="Create New User"
          />
        </div>

        <div className="border-[1px] mt-[10px] rounded-[6px] border-[#D1D5DB] ">
          <div className="flex justify-center  h-[41px] items-center border-b-[1px] py-2 border-[#D1D5DB] font-bold text-[16px]">
            <div className="w-[20%] flex justify-center"> Username/Email</div>
            <div className="w-[20%] flex justify-center">Role</div>
            <div className="w-[20%] flex justify-center">Registered At</div>
            <div className="w-[20%] flex justify-center">Status</div>
            <div className="w-[20%] flex justify-center">Actions</div>
          </div>
          {data.map((item: any, index: number) => (
            <div
              key={index}
              className={`flex justify-evenly  items-center h-[64px] font-normal text-[16px] ${
                index === data.length-1 ? "" : "border-b-[1px] border-[#D1D5DB]"
              }`}
            >
              <div className="w-[20%] flex justify-center font-normal text-[16px]">
                {item.email}
              </div>
              <div className="w-[20%] flex justify-center">
                <div className="bg-[#BFDBFE] h-[29px] rounded-[4px] px-4 flex items-center">
                  {item.roles.map((role: any, i: number) => (
                    <span
                      key={i}
                      className="text-sm  mx-1
                       py-0.5 rounded"
                    >
                      {role.roleName}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-[20%] flex justify-center">
                {item.registrationDate.substring(0, 10)}
              </div>
              <Status status={item.accountStatus} />

              <div className="w-[20%] flex justify-center items-center gap-4">
                <Edit to={`/user-account-management/edit-user/${item.id}`} />
                <Delete to="/"></Delete>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleProtected>
  );
}
