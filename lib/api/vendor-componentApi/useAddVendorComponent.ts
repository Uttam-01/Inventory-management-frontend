"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import { VendorComponent } from "@/lib/schemas";
export const useAddVendorComponent= () => {
  return useMutation({
    mutationFn: (reqData: VendorComponent ) => apiReq(reqData),
    onSuccess: (data) => {
      console.log('Vendor-Component Added:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error adding Vendor-Component:', error)
      return error;
    }
  });
};



async function apiReq(reqData: VendorComponent) {
  return authRequest({ url: API_ROUTES.VENDOR_COMPONENT, method: "POST" , data : reqData});
}

