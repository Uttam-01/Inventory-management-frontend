"use client"
import { authRequest } from "./auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../constants/apiRoutes";
import { Vendor } from "../schemas";
export const useAddVendors = () => {
  return useMutation({
    mutationFn: (reqData: Vendor) => apiReq(reqData),
    onSuccess: (data) => {
      console.log('Vendor Added:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error creating Vendor:', error)
      return error;
    }
  });
};



async function apiReq(reqData: Vendor) {
  return authRequest({ url: API_ROUTES.VENDOR, method: "POST" , data : reqData});
  
}
