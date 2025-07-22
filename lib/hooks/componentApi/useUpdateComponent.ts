"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import { Component } from "@/lib/schemas/component.schema";
export const useUpdateComponent = () => {
  return useMutation({
    mutationFn: (temp : {reqData: Component, id : number}) => apiReq(temp),
    onSuccess: (data) => {
      console.log('Component Updated:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error updating Component:', error)
      return error;
    }
  });
};



async function apiReq(temp : {reqData: Component, id : number}) {
    console.log("in api req" , temp.reqData)
  return authRequest({ url: `${API_ROUTES.COMPONENT}/${temp.id}`, method: "PUT" , data : temp.reqData});
  
}
