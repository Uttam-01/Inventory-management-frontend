const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_ROUTES = {
  LOGIN: `${baseUrl}auth/login`,
  MACHINES: `${baseUrl}machines`,
  VENDOR: `${baseUrl}vendor`,
  REFRESH: `${baseUrl}auth/refresh`,
  COMPONENT: `${baseUrl}component`,
  VENDOR_COMPONENT: `${baseUrl}vendor-components`,
  INVENTORY: `${baseUrl}inventory`,
  WORKORDER: `${baseUrl}orders`,
  SIGNUP: `${baseUrl}auth/sign-up`,
  USER: `${baseUrl}users`,
  ALLOTMENT: `${baseUrl}allotment`,
  REJECTED : `${baseUrl}rejected`,
  STATUS : `${baseUrl}status`
};