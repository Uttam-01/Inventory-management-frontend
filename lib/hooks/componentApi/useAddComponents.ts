"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import { Component } from "@/lib/schemas/component.schema";
export const useAddComponents= () => {
  return useMutation({
    mutationFn: (reqData: Component) => apiReq(reqData),
    onSuccess: (data) => {
      console.log('Component added successfully:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error adding Component:', error)
      return error;
    }
  });
};



async function apiReq(reqData: Component) {
  return authRequest({ url: API_ROUTES.COMPONENT, method: "POST" , data : reqData});
  
}
