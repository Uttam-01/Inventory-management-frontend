"use client";
import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import Delete from "@/components/ui/Delete";
import { useEffect, useState } from "react";
import { useWorkOrder } from "@/lib/api/wokOrderApi/useWorkOrder";
import Link from "next/link";
import { useDeleteWorkOrder } from "@/lib/api/wokOrderApi/useDeleteWorkOrder";
import GlobalLoader from "@/components/layout/GlobalLoader";

function WIP() {
  return (
    <button className="bg-[#D4EBF7] h[29px] w-[57px] text-[#0F4C81] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]">
      WIP
    </button>
  );
}
function NotStarted() {
  return (
    <button className="bg-[#E9ECEF] h[29px] w-[143px] text-[#343A40] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]">
      Not Started yet
    </button>
  );
}
function Completed() {
  return (
    <button className="bg-[#D4EDDA] h[29px] w-[111px] text-[#28B463] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]">
      Completed
    </button>
  );
}

function Ordered() {
  return (
    <button className="bg-[#feffb6] h[29px] w-[111px] text-[#28B463] font-emoji text-[16px] font-normal flex items-center justify-center rounded-[9999px]">
      Ordered
    </button>
  );
}

function Status(e: { index: number; status: string }) {
  return (
    <div className="">
      {e.status === "ORDERED" && <Ordered />}
      {e.status === "WORK_IN_PROGRESS" && <WIP />}
      {e.status === "NOT_STARTED_YET" && <NotStarted />}
      {e.status === "COMPLETED" && <Completed />}
    </div>
  );
}

export default function () {
  const [mounted, setMounted] = useState(false);
  const deleteWorkOrder = useDeleteWorkOrder();
  const { data, isLoading, error } = useWorkOrder();
  useEffect(() => setMounted(true), []);
  const handleDelete = (id: number) => {
    deleteWorkOrder
      .mutateAsync(id)
      .then(() => window.location.reload())
      .catch((err) => console.error("Error deleting Order:", err));
  };

  if (!mounted) return null;
  if (isLoading) return <GlobalLoader />;
  if (error) return <div>Error loading Vendors.</div>;
  return (
    <div className=" mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
      <div className="text-[#0F4C81] font-bold text-[20px]">
        Work Order Master
      </div>
      <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
        This section contains all active work orders for tracking and
        management.
      </div>
      <div className="flex justify-between items-center">
        <AddButton
          to="/work-order-master/add-new-workorder"
          text="Add New Work Order"
        />
        <div className="relative h-[50px] w-[444px] flex items-center justify-center border-[#D1D5DB] border-[1px] rounded-[6px]">
          <input
            type="text"
            placeholder="Search By WO No...."
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

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                S.N.
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                WO No
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                Machine
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-3 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-3 border border-gray-300">
                  {item.orderId}
                </td>
                <td className="px-6 py-3 border border-gray-300">
                  {item.machineName}
                </td>
                <td className="px-6 py-3 border border-gray-300">
                  <Status index={index} status={item.status} />
                </td>
                <td className="px-6 py-3 border border-gray-300">
                  <div className="flex gap-2">
                    <Edit
                      to={`/work-order-master/edit-work-order/${item.orderId}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleDelete(item.orderId)}
                      className="p-2 rounded-[5px] bg-[#E0F2F7] flex items-center justify-center"
                    >
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
                    <Link
                      title="Allot Material"
                      href={`/work-order-master/allot-component/${item.orderId}`}
                    >
                      <svg
                        width="36"
                        height="40"
                        viewBox="0 0 36 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="36" height="40" rx="5" fill="#E0F2F7" />
                        <path
                          d="M14.5 13.25C14.6658 13.25 14.8247 13.3158 14.9419 13.4331C15.0592 13.5503 15.125 13.7092 15.125 13.875V14.5H17.625V13.875C17.625 13.7092 17.6908 13.5503 17.8081 13.4331C17.9253 13.3158 18.0842 13.25 18.25 13.25C18.4158 13.25 18.5747 13.3158 18.6919 13.4331C18.8092 13.5503 18.875 13.7092 18.875 13.875V14.5H21.375V13.875C21.375 13.7092 21.4408 13.5503 21.5581 13.4331C21.6753 13.3158 21.8342 13.25 22 13.25C22.1658 13.25 22.3247 13.3158 22.4419 13.4331C22.5592 13.5503 22.625 13.7092 22.625 13.875V14.5C23.1223 14.5 23.5992 14.6975 23.9508 15.0492C24.3025 15.4008 24.5 15.8777 24.5 16.375V19.545C23.8509 19.6576 23.2526 19.9685 22.7875 20.435L21.1112 22.1125C21.0053 22.0386 20.8791 21.9993 20.75 22H15.75C15.5842 22 15.4253 22.0658 15.3081 22.1831C15.1908 22.3003 15.125 22.4592 15.125 22.625C15.125 22.7908 15.1908 22.9497 15.3081 23.0669C15.4253 23.1842 15.5842 23.25 15.75 23.25H19.9737L17.4275 25.795C17.2717 25.9517 17.1275 26.1183 16.995 26.295C16.9756 26.1443 16.9019 26.0059 16.7878 25.9056C16.6737 25.8053 16.5269 25.75 16.375 25.75H15.75C15.5842 25.75 15.4253 25.8158 15.3081 25.9331C15.1908 26.0503 15.125 26.2092 15.125 26.375C15.125 26.5408 15.1908 26.6997 15.3081 26.8169C15.4253 26.9342 15.5842 27 15.75 27H16.375C16.4417 27.0001 16.5079 26.9896 16.5712 26.9688C16.4042 27.2928 16.275 27.6351 16.1862 27.9888L15.8075 29.5025C15.7026 29.917 15.7332 30.3542 15.895 30.75H13.875C13.3777 30.75 12.9008 30.5525 12.5492 30.2008C12.1975 29.8492 12 29.3723 12 28.875V16.375C12 15.8777 12.1975 15.4008 12.5492 15.0492C12.9008 14.6975 13.3777 14.5 13.875 14.5V13.875C13.875 13.7092 13.9408 13.5503 14.0581 13.4331C14.1753 13.3158 14.3342 13.25 14.5 13.25ZM15.125 18.875C15.125 19.0408 15.1908 19.1997 15.3081 19.3169C15.4253 19.4342 15.5842 19.5 15.75 19.5H20.75C20.9158 19.5 21.0747 19.4342 21.1919 19.3169C21.3092 19.1997 21.375 19.0408 21.375 18.875C21.375 18.7092 21.3092 18.5503 21.1919 18.4331C21.0747 18.3158 20.9158 18.25 20.75 18.25H15.75C15.5842 18.25 15.4253 18.3158 15.3081 18.4331C15.1908 18.5503 15.125 18.7092 15.125 18.875ZM23.6725 21.3188C24.0383 20.9529 24.5345 20.7474 25.0519 20.7474C25.5692 20.7474 26.0654 20.9529 26.4312 21.3188C26.7971 21.6846 27.0026 22.1808 27.0026 22.6981C27.0026 23.2155 26.7971 23.7117 26.4312 24.0775L21.07 29.4375C20.6244 29.8814 20.0673 30.1971 19.4575 30.3512L17.9438 30.73C17.816 30.762 17.682 30.7604 17.5551 30.7253C17.4281 30.6901 17.3124 30.6227 17.2192 30.5295C17.126 30.4364 17.0586 30.3207 17.0235 30.1937C16.9883 30.0667 16.9867 29.9328 17.0187 29.805L17.3987 28.2925C17.5512 27.6813 17.8662 27.1238 18.3112 26.68L23.6725 21.3188Z"
                          fill="#0F4C81"
                        />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
