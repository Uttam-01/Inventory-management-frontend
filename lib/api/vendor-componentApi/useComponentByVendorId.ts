"use client"
import { authRequest } from "../auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import { Vendor, VendorComponent } from "../../schemas";
export const useComponendorbyVendorId = (id : number) => {
  return useQuery( {
    queryKey: ["component" , id],
    queryFn: ()=>apiReq(id),
    enabled: typeof window !== 'undefined',
  });
};



async function apiReq(id : number) {
  return authRequest({ url: `${API_ROUTES.VENDOR_COMPONENT}/component/${id}`, method: "GET"});
}