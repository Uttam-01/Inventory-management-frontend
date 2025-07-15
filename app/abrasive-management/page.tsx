"use client";
import AddButton from "@/components/ui/Add";
import Edit from "@/components/ui/Edit";
import { useDeleteComponent } from "@/lib/api/componentApi/useDeleteComponent";

import { useComponents } from "@/lib/api/componentApi/useComponents";
import { useEffect, useState } from "react";
import RoleProtected from "@/components/RoleProtection";
import Link from "next/link";

export default function () {
  type Component = {
    id: number;
    availableStock: number;
    locationInStore: string;
    minimumStock: number;
    displayName: string;
    status: string;
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const delComponent = useDeleteComponent();
  const { data, isLoading, error } = useComponents();
  if (!mounted) return null;
  else if (isLoading) return <div>Loading.....</div>;
  else if (error) return <div>Error loading components.</div>;
  async function deleteComponent(id: number) {
    delComponent
      .mutateAsync(id)
      .then(() => window.location.reload())
      .catch((err) => console.error("Error deleting Component:", err));
  }

  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
      <div className="w-[1404px] mx-auto flex flex-col bg-[#ffffff] rounded-[8px] p-8 justify-start ">
        <div className="text-[#0F4C81] font-bold text-[20px]">
          Abrasives Management
        </div>
        <div className="text-[#343A40] bg-[#DBEAFE] flex px-4 rounded-[8px] mt-5 text-[14px] font-normal  font-emoji h-[54px] items-center">
          This is where you can manage your Abrasives effectively.
        </div>
        

        <div className="border-[1px] rounded-[6px] border-[#D1D5DB] mt-8">
          <div className="flex justify-center bg-[#FFFFFF] h-[41px] items-center border-[#D1D5DB] border-b-[1px]">
            <div className="w-[16.6%] flex justify-center">STATUS</div>
            <div className="w-[16.6%] flex justify-center">ABRASIVE NAME</div>
            <div className="w-[16.6%] flex justify-center">AVAILABLE STOCK</div>
            <div className="w-[16.6%] flex justify-center">MIN STOCK</div>
            <div className="w-[16.6%] flex justify-center">RESERVED</div>
            <div className="w-[16.6%] flex justify-center">LOCATION</div>
          </div>
          {data.map((component: Component, index: number) => (
           index<3 && <div
              key={component.id ? component.id : index}
              className={`flex justify-evenly  items-center h-[64px] ${
                component.status === "OK" ? "bg-[#ffffff]" : "bg-[#F89C9C]"
              }`}
            >
              <div className="w-[16.6%] flex justify-center">
                {component.status === "OK" ? (
                  <svg
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
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.72495 21C2.54162 21 2.37495 20.9543 2.22495 20.863C2.07495 20.7717 1.95829 20.6507 1.87495 20.5C1.79162 20.3493 1.74595 20.1867 1.73795 20.012C1.72995 19.8373 1.77562 19.6667 1.87495 19.5L11.125 3.5C11.225 3.33333 11.3543 3.20833 11.513 3.125C11.6716 3.04167 11.834 3 12 3C12.166 3 12.3286 3.04167 12.488 3.125C12.6473 3.20833 12.7763 3.33333 12.875 3.5L22.125 19.5C22.225 19.6667 22.271 19.8377 22.263 20.013C22.255 20.1883 22.209 20.3507 22.125 20.5C22.041 20.6493 21.9243 20.7703 21.775 20.863C21.6256 20.9557 21.459 21.0013 21.275 21H2.72495ZM12 18C12.2833 18 12.521 17.904 12.713 17.712C12.905 17.52 13.0006 17.2827 13 17C12.9993 16.7173 12.9033 16.48 12.712 16.288C12.5206 16.096 12.2833 16 12 16C11.7166 16 11.4793 16.096 11.288 16.288C11.0966 16.48 11.0006 16.7173 11 17C10.9993 17.2827 11.0953 17.5203 11.288 17.713C11.4806 17.9057 11.718 18.0013 12 18ZM12 15C12.2833 15 12.521 14.904 12.713 14.712C12.905 14.52 13.0006 14.2827 13 14V11C13 10.7167 12.904 10.4793 12.712 10.288C12.52 10.0967 12.2826 10.0007 12 10C11.7173 9.99933 11.48 10.0953 11.288 10.288C11.096 10.4807 11 10.718 11 11V14C11 14.2833 11.096 14.521 11.288 14.713C11.48 14.905 11.7173 15.0007 12 15Z"
                      fill="#DC3545"
                    />
                  </svg>
                )}
              </div>
              <Link href={`/abrasive-management/${component.id}`} className="w-[16.6%] flex justify-center hover:underline">
                {component.displayName}
              </Link>
              <div className="w-[16.6%] flex justify-center">
                {component.availableStock}
              </div>
              <div className="w-[16.6%] flex justify-center">
                {component.minimumStock}
              </div>
              <div className="w-[16.6%] flex justify-center">10</div>
              <div className="w-[16.6%] flex justify-center">
                {component.locationInStore}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleProtected>
  );
}
