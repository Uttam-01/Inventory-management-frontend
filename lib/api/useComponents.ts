"use client"
import { authRequest } from "./auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../constants/apiRoutes";
import axios from "axios";
export const useComponents = () => {
  return useQuery({
    queryKey: ["components"],
    queryFn: apiReq,
    enabled: typeof window !== 'undefined',
  });
};



async function apiReq() {
  return authRequest({ url: API_ROUTES.COMPONENT, method: "GET" });
  
}