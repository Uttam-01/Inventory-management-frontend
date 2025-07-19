import { useAuthStore } from "@/lib/store/useAuthStore";
import SidebarOption from "../ui/SidebarOption";

function Navbar() {
  const roles = useAuthStore((state) => state.roles);
  return (
    <div className="bg-white fixed h-screen w-[256px] transition-transform duration-300 z-200 top-0 flex-col flex items-center justify-start px-5 shadow-sm">
      {roles.includes("MANAGER") ? (
        <>
          <div className="text-[#1F2937] text-[24px] font-bold items-start  w-full px-5 mb-10">
            Store Manager
          </div>
          <SidebarOption to={"/dashboard"} name="Dashboard" />
          <SidebarOption to={"/machine-management"} name="Machine Management" />
          <SidebarOption
            to={"/component-management"}
            name="Component Management"
          />
          <SidebarOption to={"/vendor-management"} name="Vendor Management" />
          <SidebarOption
            to={"/work-order-master"}
            name="Work Order Management"
          />
          <SidebarOption to={"/material-in"} name="Material IN" />
          <SidebarOption to={"/material-out"} name="Material OUT" />
          <SidebarOption to={"/allotted-material"} name="Allotted Material" />
          <SidebarOption
            to={"/cancelled-allocated-material"}
            name="Cancelled Allocated Material"
          />
        </>
      ) : roles.includes("EMPLOYEE") ? (
        <>
          <div className="text-[#1F2937] text-[24px] font-bold items-start  w-full px-5 mb-10">
            Cost Accountant Menu
          </div>
          <SidebarOption to={"/bill-of-materials"} name="BOM Screen" />
        </>
      ) : roles.includes("ADMIN") || roles.includes("SUPER_ADMIN") ? (
        <>
          <div className="h-[64px] flex text-[#1F2937] text-[24px] border-b border-[#ddd] font-bold items-center w-full px-5 mb-5">
            Admin
          </div>
          <SidebarOption
            to={"/administrator-dashboard"}
            name="Dashboard"
            iconName="meteor-icons:home"
          />
          <SidebarOption to={"/machine-management"} name="Machine Management" iconName="fluent-emoji-high-contrast:up-right-arrow" />
          <SidebarOption
            to={"/component-management"}
            name="Component Management" iconName="fluent-emoji-high-contrast:up-right-arrow"
          />
          <SidebarOption to={"/vendor-management"} name="Vendor Management" iconName="fluent-emoji-high-contrast:up-right-arrow" />
          <SidebarOption
            to={"/work-order-master"}
            name="Work Order Management" iconName="fluent-emoji-high-contrast:up-right-arrow"
          />
          <SidebarOption to={"/vendor-components"} name="Vendor-Components" iconName="fluent-emoji-high-contrast:up-right-arrow" />
          <SidebarOption to={"/material-in"} name="Material Flow" iconName="fluent-emoji-high-contrast:up-right-arrow" />
          <SidebarOption to={"/not-completed"} name="Labour Master" iconName="fluent-emoji-high-contrast:up-right-arrow" />
          <SidebarOption
            to={"/product-price-comparision"}
            name="Product Price Comparision" iconName="fluent-emoji-high-contrast:up-right-arrow"
          />
          <SidebarOption to={"/not-completed"} name="Inventory Audit" iconName="fluent-emoji-high-contrast:up-right-arrow" />
          <SidebarOption
            to={"/abrasive-management"}
            name="Abrasive Management" iconName="fluent-emoji-high-contrast:up-right-arrow"
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;
