"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import { UserFormData } from "@/lib/schemas/user.schema";
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (temp : {reqData: UserFormData, id : number}) => apiReq(temp),
    onSuccess: (data) => {
      console.log('User Updated:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error updating user:', error)
      return error;
    }
  });
};



async function apiReq(temp : {reqData: UserFormData, id : number}) {
    console.log("in api req" , temp.reqData)
  return authRequest({ url: `${API_ROUTES.USER}/${temp.id}`, method: "PUT" , data : temp.reqData});
  
}
