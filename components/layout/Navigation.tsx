"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nameMap: Record<string, string> = {
  dashboard: "Dashboard",
  "machine-list": "Machine List",
  "component-master": "Component Master",
  "vendor-master": "Vendor Master",
  "work-order-master": "Work Order Master",
  "material-in": "Material IN",
  "material-out": "Material OUT",
  "allotted-material": "Allotted Material",
  "work-order-add": "Work Order Add/Edit",
   add: "Add",
  edit: "Edit",
  list: "List",
  "add-new-machine" : "Add New Machine",
};

export default function Navigtaion() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  let href = "";
  if (pathname.startsWith("/auth")) return null;
  
  return (
    <div className="w-[1440px] mx-auto ml-70 bg-[#ffffff]] ">
      <div className="w-[1440px] mx-auto flex gap-4 items-center h-[60px] ">
        {pathParts[pathParts.length - 1] === "dashboard" ? (
          ""
        ) : (
          <svg
            width="21"
            height="28"
            viewBox="0 0 21 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1775 21.6477L10.3971 22.4281C10.0666 22.7586 9.53223 22.7586 9.20527 22.4281L2.3709 15.5973C2.04043 15.2668 2.04043 14.7324 2.3709 14.4055L9.20527 7.57109C9.53574 7.24063 10.0701 7.24063 10.3971 7.57109L11.1775 8.35156C11.5115 8.68555 11.5045 9.23047 11.1635 9.55742L6.92715 13.5934H17.0311C17.4986 13.5934 17.8748 13.9695 17.8748 14.4371V15.5621C17.8748 16.0297 17.4986 16.4059 17.0311 16.4059H6.92715L11.1635 20.4418C11.508 20.7688 11.515 21.3137 11.1775 21.6477Z"
              fill="#0F4C81"
            />
          </svg>
        )}

        {
          <div className="text-[#0F4C81] text-[18px] font-bold">
            {nameMap[pathParts[pathParts.length - 1]]}
          </div>
        }
      </div>
    </div>
  );
}
