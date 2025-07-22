"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function MaterialFlowNav() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <div className="flex gap-5">
      <Option pathParts={pathParts} href="material/material-in" text="Material In"/>|
      <Option pathParts={pathParts} href="material/material-out" text="Material Out" />|
      <Option
        pathParts={pathParts}
        href="material/alloted-material"
        text="Allotted Material"
      />
      |
      <Option
        pathParts={pathParts}
        href="material/low-stock-material-list"
        text="Low Stock Material List"
      />
      |
      <Option
        pathParts={pathParts}
        href="material/rejected-scrap-material"
        text="Rejected/Scrap Material"
      />
      |
      <Option
        pathParts={pathParts}
        href="material/cancelled-allocation-list"
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
