import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";

export async  function Login(email: string , password : string) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log({ email, password ,  }, API_ROUTES.LOGIN );
    
      const response = await axios.post(API_ROUTES.LOGIN, {
        email: email,
        password,
      });
      
      return response.data;
    
}