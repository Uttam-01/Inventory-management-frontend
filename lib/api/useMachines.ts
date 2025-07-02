import { authRequest } from "./auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../constants/apiRoutes";
export const useMachines = () => {
  return useQuery({
    queryKey: ["machines"],
    queryFn: apiReq,
    enabled: typeof window !== 'undefined',
  });
};



async function apiReq() {
  return authRequest({ url: API_ROUTES.MACHINES, method: "GET" });
  
}
