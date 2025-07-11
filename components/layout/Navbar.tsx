
import { useAuthStore } from "@/lib/store/useAuthStore";
import SidebarOption from "../ui/SidebarOption";
function Navbar() {
  const roles = useAuthStore((state) => state.roles);
  return (
      
          <div className="bg-white  fixed h-screen w-[256px] transition-transform duration-300  pt-25 z-10 top-0 flex-col flex items-center justify-start">

            {roles.includes("MANAGER")  ? 
            <div><div className="text-[#1F2937] text-[24px] font-bold items-start  w-full px-5 mb-10">
              Store Manager
            </div>
            <SidebarOption to={"/dashboard"} name="Dashboard"/>
            <SidebarOption to={"/machine-management"} name="Machine Management"/>
            <SidebarOption to={"/component-management"} name="Component Management"/>
            <SidebarOption to={"/vendor-management"} name="Vendor Management"/>
            <SidebarOption to={"/work-order-master"} name="Work Order Management"/>
            <SidebarOption to={"/work-order-master/add-new-workorder"} name="Work Order Add/Exit"/>
            <SidebarOption to={"/material-in"} name="Material IN"/>
            <SidebarOption to={"/material-out"} name="Material OUT"/>
            <SidebarOption to={"/allotted-material"} name="Allotted Material"/>
            <SidebarOption to={"/cancelled-allocated-material"} name="Cancelled Allocated Material"/>
          </div>
            : roles.includes("EMPLOYEE") ? 
            <div>
              <div className="text-[#1F2937] text-[24px] font-bold items-start  w-full px-5 mb-10">
              Cost Accountant Menu
            </div>
            <SidebarOption to={"/bill-of-materials"} name="BOM Screen"/>
          </div> 
          : roles.includes("ADMIN") || roles.includes("SUPER_ADMIN")  ?
                <div>
            <div className="text-[#1F2937] text-[24px] font-bold items-start  w-full px-5 mb-5">
              Admin
            </div>
            <SidebarOption to={"/administrator-dashboard"} name="Dashboard"/>
            <SidebarOption to={"/machine-management"} name="Machine Management"/>
            <SidebarOption to={"/component-management"} name="Component Management"/>
            <SidebarOption to={"/vendor-management"} name="Vendor Management"/>
            <SidebarOption to={"/work-order-master"} name="Work Order Management"/>
            <SidebarOption to={"/vendor-components"} name="Vendor-Components"/>
            <SidebarOption to={"/material-in"} name="Material IN"/>
            <SidebarOption to={"/material-out"} name="Material OUT"/>
            <SidebarOption to={"/alloted-material"} name="Allotted Material"/>
            <SidebarOption to={"/cancelled-allocated-material"} name="Cancelled Allocated Material"/>
            <SidebarOption to={"/not-completed"} name="Labour Master"/>
            <SidebarOption to={"/product-price-comparision"} name="Product Price Comparision"/>
            <SidebarOption to={"/rejected-scrap-material"} name="Rejected/Scrap Material"/>
            <SidebarOption to={"/not-completed"} name="Inventory Audit"/>
            <SidebarOption to={"/low-stock-material-list"} name="Low Stock Material List"/>
            

          </div>
              :""
            }
            </div>
            
  );
}

export default Navbar;
