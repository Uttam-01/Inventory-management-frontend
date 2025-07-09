"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import { MaterialIn } from "@/lib/schemas";
export const useAddInventory= () => {
  return useMutation({
    mutationFn: (reqData: MaterialIn) => apiReq(reqData),
    onSuccess: (data) => {
      console.log('Material In entry added successfully:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error adding Material In entry:', error)
      return error;
    }
  });
};



async function apiReq(reqData: MaterialIn) {
  return authRequest({ url: API_ROUTES.INVENTORY, method: "POST" , data : reqData});
  
}
