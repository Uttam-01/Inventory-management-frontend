import { useMutation } from "@tanstack/react-query";
import { authRequest } from "./auth"; // your custom request function
import { API_ROUTES } from "../constants/apiRoutes";

export const useDeleteVendor = () => {
  return useMutation({
    mutationFn: (vendorId: number) =>
      authRequest({
        url: `${API_ROUTES.VENDOR}/${vendorId}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      console.log("Vendor deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting vendor:", error);
    },
  });
};
