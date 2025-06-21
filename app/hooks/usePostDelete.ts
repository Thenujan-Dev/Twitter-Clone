"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/helpers/baseApi";

const usePostDelete = () => {
  const queryClient = useQueryClient();
  const DeletePost = async (id: string) => {
    try {
      const response = await api.delete(`/post/delete/${id}`);
      const data: { success: boolean } = await response.data;
      if (data.success) {
        toast.success("Post Deleted Successfully!");
      }
    } catch (error: any) {
      toast.error("Something went to wrong" + error.message);
    }
  };
  return useMutation({
    mutationFn: DeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
    },
  });
};

export default usePostDelete;
