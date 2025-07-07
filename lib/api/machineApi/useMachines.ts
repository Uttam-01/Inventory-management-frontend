"use client"
import { authRequest } from "../auth";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../constants/apiRoutes";
import axios from "axios";
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


// export async function useMachines(){
//   let accessToken = localStorage.getItem("accessToken");
//   console.log(`Bearer ${accessToken}`)
//     const res = await fetch(`${API_ROUTES.MACHINES}`,{
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json'
//       },

//       // credentials: 'include' 
      
    
//     });
//     const data = await res.json();
//     console.log(data);
//     return data;
// }