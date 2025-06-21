"use client";

import { useQuery } from "@tanstack/react-query";
import { PostType } from "../UITypes/types";
import api from "../api/helpers/baseApi";

const useGetAllPosts = () => {
  const GetAllPosts = async (): Promise<{ allPosts: PostType[] }> => {
    const response = await api.get("/post/allposts");
    const data = await response.data;
    return data;
  };
  return useQuery({
    queryKey: ["get-all-posts"],
    queryFn: GetAllPosts,
  });
};

export default useGetAllPosts;
