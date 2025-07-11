"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";

export const useAddWorkOrder = () => {
  return useMutation({
    mutationFn: (reqData: any) => apiReq(reqData),
    onSuccess: (data) => {
      console.log('Work Order Added:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error creating Work Order:', error)
      return error;
    }
  });
};



async function apiReq(reqData: any) {
  return authRequest({ url: API_ROUTES.WORKORDER, method: "POST" , data : reqData});
  
}
