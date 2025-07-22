"use client"
import { authRequest } from "../auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
export const useInventory = () => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: apiReq,
    enabled: typeof window !== 'undefined',
  });
};



async function apiReq() {
  return authRequest({ url: API_ROUTES.INVENTORY, method: "GET" });
  
}