
import SidebarOption from "../ui/SidebarOption";
function Navbar() {
  return (
      
          <div className="bg-white  fixed h-screen w-[256px] transition-transform duration-300  pt-25 z-10 top-0 flex-col flex items-center justify-start">

            <div className="text-[#1F2937] text-[24px] font-bold items-start  w-full px-5 mb-10">
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
  );
}

export default Navbar;
