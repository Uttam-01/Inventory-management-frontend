"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import { Vendor } from "../../schemas";
export const useUpdateVendors = () => {
  return useMutation({
    mutationFn: (temp : {reqData: Vendor, id : number}) => apiReq(temp),
    onSuccess: (data) => {
      console.log('Vendor Updated:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error updating Vendor:', error)
      return error;
    }
  });
};



async function apiReq(temp : {reqData: Vendor, id : number}) {
    console.log("in api req" , temp.reqData)
  return authRequest({ url: `${API_ROUTES.VENDOR}/${temp.id}`, method: "PUT" , data : temp.reqData});
  
}
