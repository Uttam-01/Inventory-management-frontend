"use client"
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleProtected({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) {
  const role = useAuthStore((state) => state.role);
  const router = useRouter();
    console.log(role);
  useEffect(() => {
    if (!role || !allowedRoles.includes(role)) {
      router.replace("/unauthorized"); // or login
    }
  }, [role, allowedRoles]);

  if (!role || !allowedRoles.includes(role)) return null;

  return <>{children}</>;
}
