import { useMutation } from "@tanstack/react-query";
import { authRequest } from "../auth"; 
import { API_ROUTES } from "../../constants/apiRoutes";

export const useDeleteWorkOrder = () => {
  return useMutation({
    mutationFn: (workOrderId: number) =>
      authRequest({
        url: `${API_ROUTES.WORKORDER}/${workOrderId}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      console.log("Work Order deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting Work Order:", error);
    },
  });
};
