"use client";
import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import Delete from "@/components/ui/Delete";
import RoleProtected from "@/components/RoleProtection";

import { useMachines } from "@/lib/api/machineApi/useMachines";
import { useEffect, useState } from "react";
import { useDeleteMachine } from "@/lib/api/machineApi/useDeleteMachine";

type Machine = {
  id: number;
  machineCategory: string;
  model: string;
  modelNumber: string;
  name: string;
  associateSpareCount: number;
};



export default function () {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data, isLoading, error } = useMachines();
  console.log(data);
  const delMachine = useDeleteMachine();
   if (!mounted) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading machines.</div>;


  async function  deleteMachine(id : number){
     delMachine.mutateAsync(id)
    .then(() => window.location.reload())
    .catch(err => console.error("Error deleting machine:", err));
    
  }

  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER" , "ADMIN"]}>
    <div className="w-[1404px] mx-auto flex flex-col h-min bg-[#ffffff] rounded-[8px] p-8 justify-start ">
      <div className="text-[#0F4C81] font-bold text-[20px]">Machine List</div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[54px] items-center">
        Manage your machines and their required spare parts. You can add new
        machines, view/edit their spare lists, and remove machine definitions.
        Use this master to enable inventory forecasting.
      </div>
      <div className="flex justify-between items-center">
        <AddButton to="/machine-management/add-new-machine" text="Add New Machine" />
        <div className="relative h-[50px] w-[444px] flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
          <input
            type="text"
            placeholder="Search Machines..."
            className="h-[50px] w-[444px] px-10 rounded-[6px]"
          />
          <svg
            className="absolute top-4 left-3"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_40_374)">
              <path
                d="M16.6099 13.8344L13.4942 10.7188C13.3536 10.5781 13.163 10.5 12.963 10.5H12.4536C13.3161 9.39688 13.8286 8.00937 13.8286 6.5C13.8286 2.90937 10.9192 0 7.32861 0C3.73799 0 0.828613 2.90937 0.828613 6.5C0.828613 10.0906 3.73799 13 7.32861 13C8.83799 13 10.2255 12.4875 11.3286 11.625V12.1344C11.3286 12.3344 11.4067 12.525 11.5474 12.6656L14.663 15.7812C14.9567 16.075 15.4317 16.075 15.7224 15.7812L16.6067 14.8969C16.9005 14.6031 16.9005 14.1281 16.6099 13.8344ZM7.32861 10.5C5.11924 10.5 3.32861 8.7125 3.32861 6.5C3.32861 4.29063 5.11611 2.5 7.32861 2.5C9.53799 2.5 11.3286 4.2875 11.3286 6.5C11.3286 8.70938 9.54111 10.5 7.32861 10.5Z"
                fill="#9CA3AF"
              />
            </g>
            <defs>
              <clipPath id="clip0_40_374">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0.828613)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div className="border-[1px] rounded-[6px] border-[#D1D5DB]">
        <div className="flex justify-center bg-[#E5E7EB] h-[41px] items-center">
          <div className="w-[16.6%] flex justify-center">MACHINE NAME</div>
          <div className="w-[16.6%] flex justify-center">MACHINE CATEGORY</div>
          <div className="w-[16.6%] flex justify-center">MODEL</div>
          <div className="w-[16.6%] flex justify-center">MODELNO.</div>
          <div className="w-[16.6%] flex justify-center">
            ASSOCIATED SPARES COUNT
          </div>
          <div className="w-[16.6%] flex justify-center">ACTIONS</div>
        </div>
        {data.map((machine: Machine, index: number) => (
          <div
            key={index}
            className={`flex justify-evenly  items-center h-[64px] ${
              index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#F3F4F6]"
            }`}
          >
            <div className="w-[16.6%] flex justify-center">{machine.name}</div>
            <div className="w-[16.6%] flex justify-center">
              {machine.machineCategory}
            </div>
            <div className="w-[16.6%] flex justify-center">{machine.model}</div>
            <div className="w-[16.6%] flex justify-center">
              {machine.modelNumber}
            </div>
            <div className="w-[16.6%] flex justify-center">
              {machine.associateSpareCount}
            </div>
            <div className="w-[16.6%] flex justify-center items-center gap-4">
              <Edit to={`/machine-management/edit-machine/${machine.id}`} />
              <button  type="button" 
                onClick={() => deleteMachine(machine.id)}
              className="w-[35px] h-[40px] rounded-[5px] bg-[#E0F2F7] flex items-center justify-center hover:cursor-pointer">
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_16_2934)">
                    <path
                      d="M14.6433 1.00001H10.8933L10.5996 0.41563C10.5373 0.290697 10.4415 0.185606 10.3228 0.11218C10.2041 0.0387537 10.0673 -9.46239e-05 9.92769 5.47897e-06H6.35581C6.21655 -0.00052985 6.07996 0.0381736 5.96169 0.111682C5.84341 0.18519 5.74823 0.290529 5.68706 0.41563L5.39331 1.00001H1.64331C1.5107 1.00001 1.38353 1.05268 1.28976 1.14645C1.19599 1.24022 1.14331 1.3674 1.14331 1.50001V2.50001C1.14331 2.63261 1.19599 2.75979 1.28976 2.85356C1.38353 2.94733 1.5107 3.00001 1.64331 3.00001H14.6433C14.7759 3.00001 14.9031 2.94733 14.9969 2.85356C15.0906 2.75979 15.1433 2.63261 15.1433 2.50001V1.50001C15.1433 1.3674 15.0906 1.24022 14.9969 1.14645C14.9031 1.05268 14.7759 1.00001 14.6433 1.00001ZM2.80581 14.5938C2.82966 14.9746 2.99774 15.332 3.27583 15.5932C3.55392 15.8545 3.92112 16 4.30269 16H11.9839C12.3655 16 12.7327 15.8545 13.0108 15.5932C13.2889 15.332 13.457 14.9746 13.4808 14.5938L14.1433 4.00001H2.14331L2.80581 14.5938Z"
                      fill="#DC3545"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_16_2934">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.143311)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </RoleProtected>
  );
}
