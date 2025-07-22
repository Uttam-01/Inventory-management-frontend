"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import { Machine } from "../../schemas";
export const useRejectMaterial= () => {
  return useMutation({
    mutationFn: (reqData: any) => apiReq(reqData),
    onSuccess: (data) => {
      console.log('Material Rejected:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error Rejecting Material:', error)
      return error;
    }
  });
};



async function apiReq(reqData: any) {
  return authRequest({ url: API_ROUTES.REJECTED, method: "POST" , data : reqData});
  
}
