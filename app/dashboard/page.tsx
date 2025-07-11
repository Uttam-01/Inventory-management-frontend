"use client";
import StoreManagerDashboard from "@/components/layout/StoreManagerDashboard";
import RoleProtected from "@/components/RoleProtection";
export default function () {

  return (
    <RoleProtected allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
      <StoreManagerDashboard />
    </RoleProtected>
  );
}
