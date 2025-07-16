"use client"
import { authRequest } from "../auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
export const useComponents = (filters?: { searchBar?: string , locationInStore? : string}) => {
  return useQuery({
    queryKey: ["components", filters],
    queryFn:()=> apiReq(filters),
    enabled: typeof window !== 'undefined',
  });
};



async function apiReq(filters?: { searchBar?: string ,  locationInStore? : string}) {
  return authRequest({ url: `${API_ROUTES.COMPONENT}?name=${filters?.searchBar ?? ""}&locationInStore=${filters?.locationInStore ?? ""}`, method: "GET" });
  
}