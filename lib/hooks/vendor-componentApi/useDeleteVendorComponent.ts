import { useMutation } from "@tanstack/react-query";
import { authRequest } from "../auth"; 
import { API_ROUTES } from "../../constants/apiRoutes";

export const useVendorComponentDelete = () => {
  return useMutation({
    mutationFn: (vendorComponentId: number) =>
      authRequest({
        url: `${API_ROUTES.VENDOR_COMPONENT}/${vendorComponentId}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      console.log("Vendor-Component deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting Vendor-Component:", error);
    },
  });
};
