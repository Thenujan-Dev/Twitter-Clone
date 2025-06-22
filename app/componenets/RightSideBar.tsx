"use client";
import React from "react";
import useGetSuggestedUsers from "../hooks/useGetSuggestedUsers";
import PostSkeleton from "./PostSkeleton";
import { Button, CircularProgress } from "@mui/material";
import { useGlobalContext } from "../context/Context";
import useFollowUser from "../hooks/useFollowUser";

const RightSideBar = () => {
  const { data: suggestedUsers, isLoading: suggestedUserLoading } =
    useGetSuggestedUsers();
  const { authUser } = useGlobalContext();
  const authUserFollowerIds = authUser.followers;
  const { mutate: FollowUser, isPending: FollowUserLoadd } = useFollowUser();

  return (
    <div className="p-4 bg-[#1a1a1a] rounded-xl border border-gray-700 w-full max-w-sm space-y-4 shadow-lg">
      <h1 className="text-xl font-bold text-center text-white mb-4">
        Suggested Users to Follow
      </h1>

      {suggestedUserLoading ? (
        <PostSkeleton />
      ) : suggestedUsers?.filteredUsers &&
        suggestedUsers.filteredUsers.length > 0 ? (
        <div className="space-y-4 h-[80vh] overflow-auto">
          {suggestedUsers.filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-[#2a2a2a] p-4 rounded-lg hover:bg-[#333] transition space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold uppercase">
                  {user.username[0]}
                </div>
                <div className="text-white">
                  <h2 className="font-medium capitalize">{user.username}</h2>
                  <p className="text-sm text-gray-400">
                    @{user.username.toLowerCase()}
                  </p>
                </div>
              </div>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  textTransform: "none",
                  backgroundColor: "#1e88e5",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
                onClick={() => FollowUser(user.id)}
              >
                {authUserFollowerIds.includes(user.id) ? (
                  FollowUserLoadd ? (
                    <CircularProgress
                      sx={{ color: "white" }}
                      className="text-white font-bold"
                      size={20}
                    />
                  ) : (
                    "Follow Back"
                  )
                ) : FollowUserLoadd ? (
                  <CircularProgress
                    className="text-white font-bold"
                    sx={{ color: "white" }}
                    size={20}
                  />
                ) : (
                  "Follow"
                )}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-sm">No users to follow</p>
      )}
    </div>
  );
};

export default RightSideBar;
