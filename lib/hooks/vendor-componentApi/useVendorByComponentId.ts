"use client"
import { authRequest } from "../auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
export const useVendorByComponentId= (id : number) => {
  return useQuery( {
    queryKey: ["vendor"],
    queryFn: ()=>apiReq(id),
    enabled: typeof window !== 'undefined',
  });
};  



async function apiReq(id : number) {
  return authRequest({ url: `${API_ROUTES.VENDOR_COMPONENT}/vendor/${id}`, method: "GET"});
}
