import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
export async function authRequest(config: Parameters<typeof axios.request>[0]) {
  let accessToken = localStorage.getItem("accessToken");
  console.log(accessToken,{
      ...config,
      headers: {
         ...(config.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });

  try {
    const res = await axios.request({
      ...config,
      headers: {
         ...(config.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      },
      
    });
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.log("accesstoken error")
    if (error.response && error.response.status === 403) {
      
      const refreshTokenn = localStorage.getItem("refreshToken");
      try {
        const refreshRes = await axios.post(API_ROUTES.REFRESH, { refreshTokenn });
        const { accessToken: accessToken, refreshToken: refreshToken } = refreshRes.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

    
        const retryRes = await axios.request({
          ...config,
          headers: {
            ...(config.headers || {}),
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return retryRes.data;
      } catch (refreshError) {
        console.log("refreshtoken error")
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login";
        throw refreshError;
      }
    }
    throw error;
  }
}