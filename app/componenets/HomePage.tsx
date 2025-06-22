"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import CreatePost from "./CreatePost";
import useGetAllPosts from "../hooks/useGetAllPosts";
import { PostType } from "../UITypes/types";
import { FaRegTrashCan } from "react-icons/fa6";
import { useGlobalContext } from "../context/Context";
import PostSkeleton from "./PostSkeleton";
import usePostDelete from "../hooks/usePostDelete";
import { CircularProgress } from "@mui/material";
import usePostLike from "../hooks/usePostLike";
import { IoHeart } from "react-icons/io5";
import { FaComment } from "react-icons/fa";
import CommentBox from "./CommentBox";
import useGetFollowingPosts from "../hooks/useGetFollowingPosts";
export type tabType = "Follow You" | "Following";

const HomePage = () => {
  const [tab, setTab] = useState<tabType>("Follow You");
  const [cmtPostId, setCmtPostId] = useState("");
  const [opnCmtBox, setOpnCmtBox] = useState<boolean>(false);
  const [AllPosts, setAllPosts] = useState<PostType[]>();
  const [FollowingPosts, setFollowingPosts] = useState<PostType[]>();
  const { data: allPosts, isLoading: allPostsLoading } = useGetAllPosts();
  const { authUser } = useGlobalContext();
  const { mutate: postDelete, isPending: postdeleting } = usePostDelete();
  const { mutate: likePost } = usePostLike();
  const { data: followingPosts, isLoading: followingPostsLoading } =
    useGetFollowingPosts();

  useEffect(() => {
    if (allPosts?.allPosts.length) {
      setAllPosts(allPosts.allPosts);
    }
  }, [allPosts]);
  useEffect(() => {
    if (followingPosts?.FollowingPosts.length) {
      setFollowingPosts(followingPosts.FollowingPosts);
    }
  }, [followingPosts]);

  return (
    <div className="w-full h-full bg-[#0f0f0f]">
      <Nav tab={tab} setTab={setTab} />
      <div className="w-full h-full">
        {tab === "Follow You" ? (
          <div className="text-white w-full h-full">
            <div className="p-4 border-b border-gray-700 h-[33%]">
              <CreatePost />
            </div>
            {allPostsLoading && <PostSkeleton />}
            {opnCmtBox && (
              <CommentBox
                setOpnCmtBox={setOpnCmtBox}
                cmtPostId={cmtPostId}
                AllPosts={AllPosts}
              />
            )}
            {AllPosts && !opnCmtBox ? (
              <div className="w-full flex flex-col gap-5 p-5 h-[64%] overflow-auto ">
                {AllPosts.map((post) => (
                  <div
                    key={post.id}
                    className="w-full border border-gray-600 rounded-xl p-5 bg-[#1a1a1a] shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl font-bold text-red-500 mr-3">
                          {post.user.username[0]?.toUpperCase() || "T"}
                        </div>
                        <div>
                          <h1 className="capitalize text-lg font-semibold">
                            {post.user.username}
                          </h1>
                          <p className="lowercase text-gray-400 text-sm">
                            @{post.user.username}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition">
                        {authUser.id == post.userId &&
                          (postdeleting ? (
                            <CircularProgress
                              size={20}
                              className="font-bold text-white"
                            />
                          ) : (
                            <FaRegTrashCan
                              onClick={() => postDelete(post.id)}
                            />
                          ))}
                      </button>
                    </div>
                    <div className="mb-3">
                      <h2 className="text-xl font-semibold mb-1">
                        {post.title}
                      </h2>
                      <p className="text-gray-300">{post.body}</p>
                    </div>
                    <div className="flex items-center justify-start gap-6 mt-4 border-t border-gray-700 pt-3 text-gray-400 text-sm">
                      <div className="flex items-center gap-2 hover:text-pink-500 transition cursor-pointer">
                        <IoHeart
                          className={`${
                            post.Like.some(
                              (item) => item.user.id == authUser.id
                            ) && "text-red-600"
                          }`}
                          onClick={() => likePost(post.id)}
                        />
                        <span>{post.Like?.length || 0} Likes</span>
                      </div>
                      <div className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
                        <FaComment
                          onClick={() => {
                            setOpnCmtBox(true);
                            setCmtPostId(post.id);
                          }}
                        />
                        <span>{post.Comment?.length || 0} Comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-xl text-slate-300">No posts</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-white w-full p-5 h-full">
            {/*Following Posts */}
            {followingPostsLoading && <PostSkeleton />}
            {opnCmtBox && (
              <CommentBox
                setOpnCmtBox={setOpnCmtBox}
                cmtPostId={cmtPostId}
                AllPosts={FollowingPosts}
              />
            )}
            {FollowingPosts && !opnCmtBox ? (
              <div className="w-full flex flex-col gap-5 p-5 h-[97%] overflow-auto ">
                {FollowingPosts.map((post) => (
                  <div
                    key={post.id}
                    className="w-full border border-gray-600 rounded-xl p-5 bg-[#1a1a1a] shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl font-bold text-red-500 mr-3">
                          {post.user.username[0]?.toUpperCase() || "T"}
                        </div>
                        <div>
                          <h1 className="capitalize text-lg font-semibold">
                            {post.user.username}
                          </h1>
                          <p className="lowercase text-gray-400 text-sm">
                            @{post.user.username}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition">
                        {authUser.id == post.userId &&
                          (postdeleting ? (
                            <CircularProgress
                              size={20}
                              className="font-bold text-white"
                            />
                          ) : (
                            <FaRegTrashCan
                              onClick={() => postDelete(post.id)}
                            />
                          ))}
                      </button>
                    </div>
                    <div className="mb-3">
                      <h2 className="text-xl font-semibold mb-1">
                        {post.title}
                      </h2>
                      <p className="text-gray-300">{post.body}</p>
                    </div>
                    <div className="flex items-center justify-start gap-6 mt-4 border-t border-gray-700 pt-3 text-gray-400 text-sm">
                      <div className="flex items-center gap-2 hover:text-pink-500 transition cursor-pointer">
                        <IoHeart
                          className={`${
                            post.Like.some(
                              (item) => item.user.id == authUser.id
                            ) && "text-red-600"
                          }`}
                          onClick={() => likePost(post.id)}
                        />
                        <span>{post.Like?.length || 0} Likes</span>
                      </div>
                      <div className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
                        <FaComment
                          onClick={() => {
                            setOpnCmtBox(true);
                            setCmtPostId(post.id);
                          }}
                        />
                        <span>{post.Comment?.length || 0} Comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-xl text-slate-300">No posts</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
