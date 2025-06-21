"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";
import toast from "react-hot-toast";
interface PostData {
  title: string;
  body: string;
}
const useCreatePost = () => {
  const queryClient = useQueryClient();
  const createPost = async ({
    PostData,
    reset,
  }: {
    PostData: PostData;
    reset: () => void;
  }) => {
    try {
      const response = await api.post("/post/create", PostData);
      const data: { success: boolean } = await response.data;
      if (data.success) {
        toast.success("Post Created Successfully!");
        queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
        reset();
      }
    } catch (error: any) {
      toast.success("something went to wrong" + error.message);
    }
  };
  return useMutation({
    mutationFn: createPost,
  });
};

export default useCreatePost;
