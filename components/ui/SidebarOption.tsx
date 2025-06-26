import Link from "next/link";
function SidebarOption(e:{name: string, to : string}){
    return(
        <Link href={e.to}  className="w-[224px] mb-[20px] transition-all h-[48px] rounded-[8px] text-[#343A40] font-sans hover:text-[#0F4C81] hover:text-[16px] hover:font-medium hover:bg-[#CFDBE6] hover:cursor-pointer flex justify-start items-center px-[10px]">
            {e.name}
        </Link>
    )
}

export default SidebarOption;