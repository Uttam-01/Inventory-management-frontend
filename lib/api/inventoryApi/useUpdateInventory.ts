"use client"
import { authRequest } from "../auth";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
export const useUpdateInventory = () => {
  return useMutation({
    mutationFn: (temp : {reqData: any, id : number}) => apiReq(temp),
    onSuccess: (data) => {
      console.log('Inventory Updated:', data)
      return data;
    },
    onError: (error) => {
      console.error('Error updating Inventory:', error)
      return error;
    }
  });
};



async function apiReq(temp : {reqData: any, id : number}) {
    console.log("in api req" , temp.reqData)
  return authRequest({ url: `${API_ROUTES.INVENTORY}/${temp.id}`, method: "PUT" , data : temp.reqData});
  
}
