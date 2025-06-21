"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";
import toast from "react-hot-toast";

const useCreateComment = () => {
  const queryClient = useQueryClient();
  const commentPost = async ({ text, id }: { text: string; id: string }) => {
    const response = await api.post(`/post/comment/${id}`, { text });
    const data = await response.data;
    return data;
  };
  return useMutation({
    mutationFn: commentPost,
    onSuccess: () => {
      toast.success("Commented successfully!");
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
    },
    onError: () => {
      toast.error("something went to wrong");
    },
  });
};

export default useCreateComment;
