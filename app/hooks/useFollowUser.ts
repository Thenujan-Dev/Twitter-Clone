"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";
import toast from "react-hot-toast";

const useFollowUser = () => {
  const queryClient = useQueryClient();
  const FollowUser = async (id: string) => {
    const response = await api.post(`/user/followunfollow/${id}`);
    const data = await response.data;
    return data;
  };
  return useMutation({
    mutationFn: FollowUser,
    onSuccess() {
      toast.success("Followed successfully!");
      queryClient.invalidateQueries({ queryKey: ["get-suggested-users"] });
      queryClient.invalidateQueries({ queryKey: ["get-All-Notifications"] });
    },
    onError: () => {
      toast.error("Something went to wrong!");
    },
  });
};

export default useFollowUser;
