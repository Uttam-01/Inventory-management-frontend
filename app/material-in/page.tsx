"use client";
import { useComponents } from "@/lib/api/componentApi/useComponents";
import { useInventory } from "@/lib/api/inventoryApi/useInventory";
import { useVendors } from "@/lib/api/vendorApi/useVendors";
import { useEffect, useState } from "react";
import { authRequest } from "@/lib/api/auth";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { materialInSchema } from "@/lib/schemas";
import { useAddInventory } from "@/lib/api/inventoryApi/useAddInventory";
import { isErrored } from "stream";
import Edit from "@/components/ui/Edit";
import RoleProtected from "@/components/RoleProtection";
import { useDeleteInventory } from "@/lib/api/inventoryApi/useDeleteInventory";
import { useRouter } from "next/navigation";
import MaterialFlowNav from "@/components/layout/MaterialFlowNav";
import GlobalLoader from "@/components/layout/GlobalLoader";

function InputBox(e: {
  label: string;
  placeholder: string;
  name: string;
  defaultValue?: number;
  error?: string;
  onChange?: any;
  max?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor=" font-emoji text-[#343A40] text-[14px] font-normal">
        {e.label}
      </label>
      <input
        type={e.type ?? "text"}
        placeholder={e.placeholder}
        className="h-[41px] w-[250px] bg-[#ffffff] border px-3 rounded-[8px]"
        name={e.name}
        onChange={e.onChange}
        max={e.max}
      />
      {e.error && <span className="text-red-500 text-xs">{e.error}</span>}
    </div>
  );
}

export default function () {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [toUpdate, setToUpdate] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteInventory = useDeleteInventory();
  const [rejectFormData, setRejectFormData] = useState<{
    quantity: number;
    reason: string;
  }>({ quantity: 0, reason: "" });
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => setMounted(true), []);
  const { data, isLoading, error } = useInventory();

  if (!mounted) return null;

  // function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   const formData = Object.fromEntries(
  //     new FormData(e.currentTarget).entries()
  //   );
  //   if (!selected && !selectedVendor) {
  //     setFormErrors({
  //       component: "Component is Required.",
  //       vendor: "Vendor is required.",
  //     });
  //     return;
  //   } else if (!selected) {
  //     setFormErrors({ component: "Component is Required." });
  //     return;
  //   } else if (!selectedVendor) {
  //     setFormErrors({ vendor: "Vendor is required." });
  //     return;
  //   }
  //   const finalData = {
  //     ...formData,
  //     componentId: selected.id ?? selected.componentId,
  //     vendorId: selectedVendor.id ?? selectedVendor.vendorId,
  //   };
  //   console.log(finalData);
  //   const result = materialInSchema.safeParse(finalData);
  //   if (!result.success) {
  //     const errors: { [key: string]: string } = {};
  //     result.error.errors.forEach((err) => {
  //       if (err.path[0]) errors[err.path[0] as string] = err.message;
  //     });
  //     setFormErrors(errors);
  //     return;
  //   }
  //   setFormErrors({});
  //   addInventoryMutation.mutate(result.data);e: React.FormEvent<HTMLFormElement>
  // }
  async function handleDelete(id: number) {
    deleteInventory
      .mutateAsync(id)
      .then(() => window.location.reload())
      .catch((err) => console.error("Error deleting machine:", err));
  }

  async function handleStatusForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    console.log("sel.", selectedStatus)
    if (selectedStatus === "REJECTED") {
      console.log("in rrejected")
      const finalData = {
        ...formData,
        inventoryId: toUpdate.id,
      };
      try {
        const data = await authRequest({
          url: API_ROUTES.REJECTED,
          method: "POST",
          data: finalData,
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Success:", data);
      } catch (err: any) {
        if (err.response) {
          console.error("Backend Error:", err.response.data);
          alert(err.response.data?.message || "Something went wrong");
        } else {
          console.error("Unknown Error:", err);
          alert("Something went wrong");
        }
      } finally {
        setIsOpen(false);
      }
    } else {
      console.log("in else")
      const finalData = {
        status : selectedStatus
      };
      try {
        const data = await authRequest({
          url: `${API_ROUTES.STATUS}/${toUpdate.id}`,
          method: "PATCH",
          data: finalData,
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Success:", data);
      } catch (err: any) {
        if (err.response) {
          console.error("Backend Error:", err.response.data);
          alert(err.response.data?.message || "Something went wrong");
        } else {
          console.error("Unknown Error:", err);
          alert("Something went wrong");
        }
      } finally {
        setIsOpen(false);
      }
    }
  }

  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
      <div className=" mx-auto flex flex-col rounded-[8px]  justify-start">
        <div className=" mx-auto flex flex-col   rounded-[8px] pb-8 justify-start ">
          <MaterialFlowNav />
        </div>

        <div className=" mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
          <div className="text-[#0F4C81] font-bold text-[20px]">
            Material IN
          </div>
          <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 mb-3 text-[14px] font-normal  font-emoji h-[54px] items-center">
            Use this form to see the record of new material entries quickly and
            efficiently.
          </div>
          <div className="text-[#343A40] text-[18px] font-bold  mt-6"></div>

          {isLoading ? (
            <GlobalLoader />
          ) : error ? (
            <div>Error occured.</div>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="min-w-full border border-gray-300 divide-y divide-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                      S.N.
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                      Bill No.
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                      Total Effective Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border border-gray-300 capitalize">
                      Remarks
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
                        {item.updatedAt.substring(0, 10)}
                      </td>
                      <td className="px-6 py-3 border border-gray-300">
                        {item.billNo}
                      </td>
                      <td className="px-6 py-3 border border-gray-300">
                        {item.componentName}
                      </td>
                      <td className="px-6 py-3 border border-gray-300">
                        {item.vendorName}
                      </td>
                      <td className="px-6 py-3 border border-gray-300">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-3 border border-gray-300">
                        ₹ {item.totalPrice}
                      </td>
                      <td className="px-6 py-3 border border-gray-300">
                        {item.status}
                      </td>
                      <td className="px-6 py-3 border border-gray-300">
                        <div className="flex gap-2">
                          <Edit
                            to={`/material-in/edit-material-in/${item.id}`}
                          />
                          <button
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                            type="button"
                            className="hover:cursor-pointer w-[35px] h-[40px] rounded-[5px] bg-[#E0F2F7] flex items-center justify-center"
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </RoleProtected>
  );
}
