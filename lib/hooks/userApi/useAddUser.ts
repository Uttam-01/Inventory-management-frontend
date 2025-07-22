"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import { UserFormData } from "@/lib/schemas/user.schema";
export const useAddUser= () => {
  return useMutation({
    mutationFn: (reqData: UserFormData) => apiReq(reqData),
    onSuccess: (data) => {
      console.log('User added successfully:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error adding User:', error)
      return error;
    }
  });
};



async function apiReq(reqData: UserFormData) {
  return authRequest({ url: API_ROUTES.SIGNUP, method: "POST" , data : reqData});
  
}