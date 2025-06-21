"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/helpers/baseApi";
import { PostType } from "../UITypes/types";
import { useGlobalContext } from "../context/Context";

const usePostLike = () => {
  const queryClient = useQueryClient();
  const { authUser } = useGlobalContext();

  const LikePost = async (postId: string) => {
    const response = await api.post(`/post/likeunlike/${postId}`);
    return response.data;
  };

  return useMutation({
    mutationFn: LikePost,

    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["get-all-posts"] });

      const previousData = queryClient.getQueryData<{ allPosts: PostType[] }>([
        "get-all-posts",
      ]);

      queryClient.setQueryData(["get-all-posts"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          allPosts: oldData.allPosts.map((post: PostType) => {
            if (post.id !== postId) return post;

            const alreadyLiked = post.Like?.some(
              (like) => like.user.id === authUser.id
            );

            return {
              ...post,
              Like: alreadyLiked
                ? post.Like.filter((like) => like.user.id !== authUser.id)
                : [
                    ...post.Like,
                    { user: { id: authUser.id, username: authUser.username } },
                  ],
            };
          }),
        };
      });

      return { previousData };
    },

    onError: (_err, _postId, context) => {
      toast.error("Failed to update like");
      if (context?.previousData) {
        queryClient.setQueryData(["get-all-posts"], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
    },
  });
};

export default usePostLike;
