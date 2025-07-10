"use client"
import { authRequest } from "./auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../constants/apiRoutes";
export const useLowStock = () => {
  return useQuery({
    queryKey: ["lowStock"],
    queryFn: apiReq,
    enabled: typeof window !== 'undefined',
  });
};



async function apiReq() {
  return authRequest({ url: `${API_ROUTES.COMPONENT}/low-stock`, method: "GET" });
  
}