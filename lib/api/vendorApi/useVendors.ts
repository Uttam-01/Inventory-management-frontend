"use client"
import { authRequest } from "../auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import axios from "axios";
export const useVendors = (filters?: { search?: string , city? : string}) => {
  return useQuery({
    queryKey: ["vendors", filters],
    queryFn: ()=> apiReq(filters),
    enabled: typeof window !== 'undefined',
  });
};



async function apiReq(filters?: { search?: string , city? : string}) {
  return authRequest({ url: `${API_ROUTES.VENDOR}?name=${filters?.search ?? ""}&locationInStore=${filters?.city ?? ""}`, method: "GET" });
  
}