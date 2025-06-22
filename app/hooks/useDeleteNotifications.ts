"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";
import toast from "react-hot-toast";

const useDeleteNotifications = () => {
  const queryClient = useQueryClient();
  const DeleteAllNotifi = async () => {
    const response = await api.delete("/notification");
    const data = await response.data;
  };
  return useMutation({
    mutationFn: DeleteAllNotifi,
    onSuccess: () => {
      toast.success("All Posts are Deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["get-All-Notifications"] });
    },
  });
};

export default useDeleteNotifications;
