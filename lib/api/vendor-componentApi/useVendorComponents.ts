"use client"
import { authRequest } from "../auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
export const useVendorComponents = () => {
  return useQuery({
    queryKey: ["vendor-components"],
    queryFn: apiReq,
    enabled: typeof window !== 'undefined',
  });
};



async function apiReq() {
  return authRequest({ url: API_ROUTES.VENDOR_COMPONENT, method: "GET" });
  
}