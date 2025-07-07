"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import { Vendor, VendorComponent } from "../../schemas";
export const useUpdateVendorComponent= () => {
  return useMutation({
    mutationFn: (temp : {reqData: VendorComponent, id : number}) => apiReq(temp),
    onSuccess: (data) => {
      console.log('Vendor-Component Updated:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error updating Vendor-Component:', error)
      return error;
    }
  });
};



async function apiReq(temp : {reqData: VendorComponent, id : number}) {
    console.log("in api req" , temp.reqData)
  return authRequest({ url: `${API_ROUTES.VENDOR_COMPONENT}/${temp.id}`, method: "PUT" , data : temp.reqData});
  
}
