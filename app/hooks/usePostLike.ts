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

  const updateCache = (
    key: string[],
    postId: string,
    userId: string,
    username: string
  ) => {
    const prevData = queryClient.getQueryData<{
      allPosts?: PostType[];
      FollowingPosts?: PostType[];
    }>(key);

    queryClient.setQueryData(key, (oldData: any) => {
      if (!oldData) return oldData;

      const postKey = oldData.allPosts ? "allPosts" : "FollowingPosts";

      return {
        ...oldData,
        [postKey]: oldData[postKey].map((post: PostType) => {
          if (post.id !== postId) return post;

          const alreadyLiked = post.Like?.some(
            (like) => like.user.id === userId
          );

          return {
            ...post,
            Like: alreadyLiked
              ? post.Like.filter((like) => like.user.id !== userId)
              : [...post.Like, { user: { id: userId, username: username } }],
          };
        }),
      };
    });

    return prevData;
  };

  return useMutation({
    mutationFn: LikePost,

    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["get-all-posts"] });
      await queryClient.cancelQueries({ queryKey: ["get-following-posts"] });
      queryClient.invalidateQueries({ queryKey: ["get-All-Notifications"] });

      const previousAllPosts = updateCache(
        ["get-all-posts"],
        postId,
        authUser.id,
        authUser.username
      );
      const previousFollowingPosts = updateCache(
        ["get-following-posts"],
        postId,
        authUser.id,
        authUser.username
      );

      return { previousAllPosts, previousFollowingPosts };
    },

    onError: (_err, _postId, context) => {
      toast.error("Failed to update like");

      if (context?.previousAllPosts) {
        queryClient.setQueryData(["get-all-posts"], context.previousAllPosts);
      }

      if (context?.previousFollowingPosts) {
        queryClient.setQueryData(
          ["get-following-posts"],
          context.previousFollowingPosts
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
      queryClient.invalidateQueries({ queryKey: ["get-following-posts"] });
    },
  });
};

export default usePostLike;
