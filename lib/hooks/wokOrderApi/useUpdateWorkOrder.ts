"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import { Component } from "@/lib/schemas/component.schema";
export const useUpdateWorkOrder = () => {
  return useMutation({
    mutationFn: (temp : {reqData: any, id : number}) => apiReq(temp),
    onSuccess: (data) => {
      console.log('Work Order Updated:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error updating Work Order:', error)
      return error;
    }
  });
};



async function apiReq(temp : {reqData: any, id : number}) {
  return authRequest({ url: `${API_ROUTES.WORKORDER}/${temp.id}`, method: "PUT" , data : temp.reqData});
  
}
