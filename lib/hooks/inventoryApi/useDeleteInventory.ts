import { useMutation } from "@tanstack/react-query";
import { authRequest } from "../auth"; // your custom request function
import { API_ROUTES } from "../../constants/apiRoutes";

export const useDeleteInventory = () => {
  return useMutation({
    mutationFn: (inventoryId: number) =>
      authRequest({
        url: `${API_ROUTES.INVENTORY}/${inventoryId}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      console.log("Material-In Entry deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting Material-In:", error);
    },
  });
};
