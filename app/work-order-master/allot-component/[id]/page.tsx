"use client";
import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import { authRequest } from "@/lib/api/auth";
import { useAddAllotment } from "@/lib/api/wokOrderApi/useAllotment";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function () {
  const [mounted, setMounted] = useState(false);
  const [checkbox, setCheckbox] =
    useState<{ componentId: any; value: boolean }[]>();
  useEffect(() => setMounted(true), []);
  const [orderId, setOrderId] = useState<any>();

  const pathname = usePathname();

  useEffect(() => {
    const getInfo = async () => {
      const pathParts = pathname.split("/").filter(Boolean);
      const id = pathParts[pathParts.length - 1];
      setOrderId(id);
    };

    if (pathname) {
      getInfo();
    }
  }, [pathname]);
  //   const handleDelete = (id: number) => {
  //    deleteVendor.mutateAsync(id)
  //     .then(() => window.location.reload())
  //     .catch(err => console.error("Error deleting Vendor:", err));
  //   };

  //   if (!mounted) return null;
  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error loading Vendors.</div>;
  const addAllotmentMutaion = useAddAllotment();
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    const components: { componentId: number; quantityAllotted: number }[] = [];

    checkbox?.forEach((item, i) => {
      if (item && item.value === true) {
        const quantity = formData[item.componentId.toString()];
        components.push({
          componentId: item.componentId,
          quantityAllotted: Number(quantity) || 0,
        });
      }
    });
    console.log("Selected Components with Quantity:", components);
    const finalPayload = {
      orderId: orderId,
      components,
    };
    console.log(finalPayload);
  }

  return (
    <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 pb-5 justify-start ">
      <div className="text-[#0F4C81] font-bold text-[20px] mb-5">
        Allot Material - Work Order Number #{orderId}
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="border-[1px] mt-[10px] rounded-[6px] border-[#D1D5DB]">
          <div className="flex justify-center bg-[#E5E7EB] h-[41px] items-center">
            <div className="w-[15%] flex justify-center">S. No.</div>
            <div className="w-[30%] flex justify-center">Component Name</div>
            <div className="w-[25%] flex justify-center">Required Quanttiy</div>
            <div className="w-[15%] flex justify-center">Allotted Quantity</div>
            <div className="w-[15%] flex justify-center">
              Available Quantity
            </div>
            <div className="w-[15%] flex justify-center">To Allot</div>
            {/* <div className="w-[25%] flex justify-center">ACTIONS</div> */}
          </div>
          {Array.from({ length: 5 }).map((_, index: number) => (
            <div
              key={index}
              className={`flex justify-evenly items-center h-[64px] ${
                index % 2 === 0 ? "bg-[#c3fabe]" : "bg-[#ffffff]"
              }`}
            >
              <div className="relative w-[15%] flex justify-center">
                {
                    index%2===0 && <svg className=" absolute left-8"
                  width="12"
                  height="19"
                  viewBox="0 0 12 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.71119 15.704C2.71119 15.5653 2.68452 15.496 2.63119 15.496L2.26319 15.672C2.26319 15.5973 2.22052 15.544 2.13519 15.512L2.00719 15.496C1.92185 15.496 1.81519 15.5333 1.68719 15.608C1.66585 15.5547 1.63919 15.5013 1.60719 15.448C1.57519 15.3947 1.54852 15.3467 1.52719 15.304C1.38852 15.0373 1.24985 14.744 1.11119 14.424C0.983188 14.0933 0.860521 13.7787 0.743188 13.48C0.636521 13.1813 0.551188 12.9467 0.487188 12.776C0.444521 12.6373 0.396521 12.4293 0.343188 12.152C0.289854 11.8747 0.236521 11.5227 0.183188 11.096C0.300521 11.1707 0.391188 11.208 0.455188 11.208C0.529854 11.208 0.599188 11.096 0.663188 10.872C0.695188 10.9147 0.753854 10.936 0.839188 10.936C0.903188 10.936 0.951188 10.9147 0.983188 10.872L1.23919 10.488L1.52719 10.584H1.54319C1.56452 10.584 1.58585 10.5733 1.60719 10.552C1.62852 10.5307 1.66052 10.5093 1.70319 10.488C1.78852 10.4347 1.85252 10.408 1.89519 10.408L1.94319 10.424C2.20985 10.552 2.38052 10.7867 2.45519 11.128C2.64719 11.9387 2.83919 12.344 3.03119 12.344C3.22319 12.344 3.44719 12.1413 3.70319 11.736C3.83119 11.5333 3.95919 11.2987 4.08719 11.032C4.22585 10.7653 4.36452 10.4667 4.50319 10.136C4.52452 10.264 4.54585 10.328 4.56719 10.328C4.62052 10.328 4.71119 10.1947 4.83919 9.928C4.97785 9.66133 5.19652 9.29333 5.49519 8.824C5.66585 8.536 5.87919 8.21067 6.13519 7.848C6.40185 7.48533 6.68452 7.112 6.98319 6.728C7.28185 6.344 7.56985 5.98133 7.84719 5.64C8.13519 5.29867 8.39119 5.00533 8.61519 4.76C8.83919 4.51467 9.00452 4.35467 9.11119 4.28C9.51652 4.00267 9.83652 3.736 10.0712 3.48C10.0605 3.55467 10.0445 3.624 10.0232 3.688C10.0125 3.74133 10.0072 3.77867 10.0072 3.8C10.0072 3.84267 10.0285 3.864 10.0712 3.864L10.5192 3.64V3.704C10.5192 3.78933 10.5405 3.832 10.5832 3.832C10.6152 3.832 10.6792 3.784 10.7752 3.688C10.8712 3.592 10.9245 3.52267 10.9352 3.48L10.9032 3.704L11.4472 3.384L11.3192 3.672C11.4899 3.55467 11.6125 3.496 11.6872 3.496C11.7299 3.496 11.7619 3.52267 11.7832 3.576C11.8045 3.61867 11.8152 3.66133 11.8152 3.704C11.8152 3.768 11.7885 3.84267 11.7352 3.928C11.6819 4.01333 11.6125 4.11467 11.5272 4.232C11.4632 4.31733 11.3565 4.44533 11.2072 4.616C11.0685 4.776 10.8552 5.016 10.5672 5.336C10.2792 5.64533 9.89519 6.07733 9.41519 6.632C9.28719 6.77067 9.08985 7.016 8.82319 7.368C8.55652 7.70933 8.25252 8.10933 7.91119 8.568C7.58052 9.016 7.24985 9.46933 6.91919 9.928C6.58852 10.3867 6.29519 10.8027 6.03919 11.176C5.78319 11.5387 5.60185 11.8107 5.49519 11.992L4.50319 13.672C4.28985 14.0347 4.11385 14.3333 3.97519 14.568C3.83652 14.792 3.72985 14.9467 3.65519 15.032C3.49519 15.224 3.31919 15.3947 3.12719 15.544L2.98319 15.464L2.85519 15.544L2.71119 15.704Z"
                    fill="#28B463"
                  />
                </svg>
                }
                
                {index + 1}
              </div>
              <div className="w-[30%] flex justify-center">{"Comp. Name"}</div>
              <div className="w-[25%] flex justify-center">{index + 4}</div>
              <div className="w-[15%] flex justify-center">{index + 2}</div>
              <div className="w-[15%] flex justify-center">{index + 1000}</div>
              <div className="w-[15%] flex justify-center">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const id = index; // or however you get your componentId

                    setCheckbox((prev = []) => {
                      const exists = prev.find(
                        (entry) => entry.componentId === id
                      );
                      if (exists) {
                        return prev.map((entry) =>
                          entry.componentId === id
                            ? { ...entry, value: checked }
                            : entry
                        );
                      } else {
                        return [...prev, { componentId: id, value: checked }];
                      }
                    });
                  }}
                />
                <input
                  name={index.toString()}
                  type="number"
                  min="0"
                  max="2"
                  className="w-full h-[40px] bg-[#ffffff] border-[#D1D5DB] border-[1px] rounded-[6px] px-3 mx-5"
                />
              </div>
              {/* <div className="w-[25%] flex justify-center items-center gap-4">
              <Edit to={`/vendor-management/edit-vendor/${vendor.id}`} />
              <div onClick={()=>{handleDelete(vendor.id)}} className="hover:cursor-pointer w-[35px] h-[40px] rounded-[5px] bg-[#E0F2F7] flex items-center justify-center">
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
              </div>
            </div> */}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-end mt-4 mb-0">
          <div>
            <button className=" text-[#FFFFFF] text-[16px] font-sans font-bold h-[50px] px-5 rounded-[6px] bg-[#22C55E] flex justify-center items-center gap-2 my-5">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1001 6.5H9.6001V2C9.6001 1.44781 9.15229 1 8.6001 1H7.6001C7.04791 1 6.6001 1.44781 6.6001 2V6.5H2.1001C1.54791 6.5 1.1001 6.94781 1.1001 7.5V8.5C1.1001 9.05219 1.54791 9.5 2.1001 9.5H6.6001V14C6.6001 14.5522 7.04791 15 7.6001 15H8.6001C9.15229 15 9.6001 14.5522 9.6001 14V9.5H14.1001C14.6523 9.5 15.1001 9.05219 15.1001 8.5V7.5C15.1001 6.94781 14.6523 6.5 14.1001 6.5Z"
                  fill="white"
                />
              </svg>
              Allot Material
            </button>
          </div>
        </div>
      </form>
      <pre></pre>
    </div>
  );
}
