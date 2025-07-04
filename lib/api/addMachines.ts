"use client"
import { authRequest } from "./auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../constants/apiRoutes";
import { Machine } from "../schemas";
export const useAddMachines= () => {
  return useMutation({
    mutationFn: (reqData: Machine) => apiReq(reqData),
    onSuccess: (data) => {
      console.log('Machine Added:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error adding machine:', error)
      return error;
    }
  });
};



async function apiReq(reqData: Machine) {
  return authRequest({ url: API_ROUTES.MACHINES, method: "POST" , data : reqData});
  
}
