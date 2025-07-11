"use client";
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
  const roles = useAuthStore((state) => state.roles); // array of roles
  const router = useRouter();

  const isAuthorized = roles?.some((role) => allowedRoles.includes(role));

  useEffect(() => {
    if (!isAuthorized) {
      router.replace("/unauthorized"); // or login
    }
  }, [isAuthorized, router, allowedRoles]);

  if (!isAuthorized) return null;

  return <>{children}</>;
}
