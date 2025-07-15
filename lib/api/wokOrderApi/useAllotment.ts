"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
export const useAddAllotment = () => {
  return useMutation({
    mutationFn: (reqData: any) => apiReq(reqData),
    onSuccess: (data) => {
      console.log('Material allotted sucessfully:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error allotting material:', error)
      return error;
    }
  });
};



async function apiReq(reqData: any) {
  return authRequest({ url: API_ROUTES.VENDOR, method: "POST" , data : reqData});
  
}
