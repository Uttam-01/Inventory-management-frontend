import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

function SidebarOption(e: { name: string; to: string; iconName?: string }) {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  if (pathname.startsWith("/auth")) return null;
  return (
    <Link
      href={e.to}
      title={e.name}
      className={`w-full mb-[10px] transition-all h-[48px] rounded-[8px] hover:text-[#0F4C81] hover:text-[16px] hover:bg-[#CFDBE6] hover:cursor-pointer flex justify-start items-center gap-2 px-[10px] ${
        `/${pathParts[pathParts.length - 1]}` === e.to
          ? "text-[#0F4C81] text-[16px] font-medium bg-[#CFDBE6]"
          : "text-[#343A40] font-sans"
      }`}
    >
      {e.iconName ? <Icon icon={e.iconName} width="18" height="18" /> : <></>}
      <div className="truncate">{e.name}</div>
    </Link>
  );
}

export default SidebarOption;
