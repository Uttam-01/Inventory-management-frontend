"use client"
import { authRequest } from "../auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import axios from "axios";
export const useVendors = () => {
  return useQuery({
    queryKey: ["vendors"],
    queryFn: apiReq,
    enabled: typeof window !== 'undefined',
  });
};



async function apiReq() {
  return authRequest({ url: API_ROUTES.VENDOR, method: "GET" });
  
}