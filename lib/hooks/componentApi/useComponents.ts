"use client"
import { authRequest } from "../auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
export const useComponents = (filters?: { keyword?: string , page? : number}) => {
  return useQuery({
    queryKey: ["components", filters],
    queryFn:()=> apiReq(filters),
    enabled: typeof window !== 'undefined',
  });
};



async function apiReq(filters?: { keyword?: string ,  page? : number}) {
  return authRequest({ url: `${API_ROUTES.COMPONENT}?page=${filters?.page?.toString() ?? "0"}&keyword=${filters?.keyword ?? ""}`, method: "GET" });
  
}