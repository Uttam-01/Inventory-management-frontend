"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function MaterialFlowNav() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <div className="flex gap-5">
      <Option pathParts={pathParts} href="material-in" text="Material In"/>|
      <Option pathParts={pathParts} href="material-out" text="Material Out" />|
      <Option
        pathParts={pathParts}
        href="alloted-material"
        text="Allotted Material"
      />
      |
      <Option
        pathParts={pathParts}
        href="low-stock-material-list"
        text="Low Stock Material List"
      />
      |
      <Option
        pathParts={pathParts}
        href="rejected-scrap-material"
        text="Rejected/Scrap Material"
      />
      |
      <Option
        pathParts={pathParts}
        href="cancelled-allocation-list"
        text="Cancelled Allocated Material"
      />
    </div>
  );
}

function Option({
  text,
  href,
  pathParts,
}: {
  text: string;
  href: string;
  pathParts: string[];
}) {
  const isActive = pathParts.includes(href.toLowerCase()); // Case-insensitive match
  return (
    <Link
      href={`/${href}`}
      className={`font-sans font-medium  hover:text-[#0F4C81]  ${
        isActive ? "transition-all font-bold text-[#0F4C81] underline-offset-6 decoration-[#0F4C81] underline decoration-[3px]" : "text-[16px]  text-[#343A40] "
      }`}
    >
      {text}
    </Link>
  );
}

export default MaterialFlowNav;
