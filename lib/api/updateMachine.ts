"use client"
import { authRequest } from "./auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../constants/apiRoutes";
import { Machine } from "../schemas";
export const updateVendors = () => {
  return useMutation({
    mutationFn: (temp : {reqData: Machine, id : number}) => apiReq(temp),
    onSuccess: (data) => {
      console.log('Machine Updated:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error updating Machine:', error)
      return error;
    }
  });
};



async function apiReq(temp : {reqData: Machine, id : number}) {
    console.log("in api req" , temp.reqData)
  return authRequest({ url: `${API_ROUTES.VENDOR}/${temp.id}`, method: "PUT" , data : temp.reqData});
  
}
