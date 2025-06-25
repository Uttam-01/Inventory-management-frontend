"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/auth")) return null;
  return <Navbar />;
}