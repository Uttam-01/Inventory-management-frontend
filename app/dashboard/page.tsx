"use client";
import StoreManagerDashboard from "@/components/layout/StoreManagerDashboard";
import RoleProtected from "@/components/RoleProtection";
import { useAuthStore } from "@/lib/store/useAuthStore";
export default function () {
  const role = useAuthStore((state) => state.role);
  console.log("Stored role is:", role);
  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
      <StoreManagerDashboard />
    </RoleProtected>
  );
}
