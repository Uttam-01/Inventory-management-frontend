import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarOption(e: { name: string; to: string }) {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  console.log(pathParts[pathParts.length -1] , e.to);
  if (pathname.startsWith("/auth")) return null;
  return (
    <Link
      href={e.to}
      className={`w-[224px] mb-[20px] transition-all h-[48px] rounded-[8px]  hover:text-[#0F4C81] hover:text-[16px] hover:font-medium hover:bg-[#CFDBE6] hover:cursor-pointer flex justify-start items-center px-[10px] ${`/${pathParts[pathParts.length -1]}` === e.to ? "text-[#0F4C81] text-[16px] font-medium bg-[#CFDBE6]" : "text-[#343A40] font-sans "}`}
    >
      {e.name}
    </Link>
  );
}

export default SidebarOption;
