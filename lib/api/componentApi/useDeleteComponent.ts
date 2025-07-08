import { useMutation } from "@tanstack/react-query";
import { authRequest } from "../auth"; 
import { API_ROUTES } from "../../constants/apiRoutes";

export const useDeleteComponent = () => {
  return useMutation({
    mutationFn: (componentId: number) =>
      authRequest({
        url: `${API_ROUTES.COMPONENT}/${componentId}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      console.log("Component deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting Component:", error);
    },
  });
};
