"use client";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../UITypes/types";
import api from "../api/helpers/baseApi";

const useGetFollowingPosts = () => {
  const GetFollowingPosts = async (): Promise<{
    FollowingPosts: PostType[];
  }> => {
    const response = await api.get("/post/followingpost");
    const data = await response.data;
    return data;
  };
  return useQuery({
    queryKey: ["get-Following-posts"],
    queryFn: GetFollowingPosts,
  });
};

export default useGetFollowingPosts;
