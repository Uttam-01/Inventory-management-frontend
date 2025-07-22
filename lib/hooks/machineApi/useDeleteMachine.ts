import { useMutation } from "@tanstack/react-query";
import { authRequest } from "../auth"; // your custom request function
import { API_ROUTES } from "../../constants/apiRoutes";

export const useDeleteMachine = () => {
  return useMutation({
    mutationFn: (machineId: number) =>
      authRequest({
        url: `${API_ROUTES.MACHINES}/${machineId}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      console.log("Machine deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting Machine:", error);
    },
  });
};
