"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaLink } from "react-icons/fa";
import EditProfile from "./EditProfile";
import useGetProfileData from "../hooks/useGetProfileData";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  type tab = "Followers" | "Following";
  const [isEditing, setIsEditing] = useState(false);
  const { data: profileData } = useGetProfileData();
  const [tabType, setTabType] = useState<tab>("Followers");
  const [pop, setPop] = useState<boolean>(false);
  const router = useRouter();
  const feedArray =
    tabType == "Followers" ? profileData?.followers : profileData?.following;
  const cancelUpdate = () => {
    setIsEditing(false);
  };
  return isEditing ? (
    <EditProfile cancelUpdate={cancelUpdate} setPop={setPop} />
  ) : (
    profileData && (
      <div className="w-full h-[95vh] text-white bg-gradient-to-tr from-black via-zinc-900 to-black px-4 py-6">
        {/* Header */}
        <div className="w-full border-b border-slate-600 mb-6 flex items-center gap-4 pb-3">
          <FaArrowLeft
            className="text-xl cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          />
          <h1 className="text-xl font-semibold capitalize">
            {profileData.currentUser.username}
          </h1>
        </div>

        {/* Cover & Profile Avatar */}
        <div className="relative w-full">
          <div className="w-full h-[20vh] bg-gray-700 rounded-md" />
          <div className="absolute -bottom-16 left-4">
            <div className="w-32 h-32 rounded-full border-4 border-black bg-blue-600 text-white text-4xl font-bold flex items-center justify-center shadow-md">
              {profileData.currentUser.username[0].toUpperCase()}
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            type="button"
            className="absolute right-4 -bottom-6 px-4 py-1.5 text-sm border border-slate-400 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Info */}
        <div className="mt-20 px-4 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl font-bold capitalize">
              {profileData.currentUser.username}
            </h2>
            <p className="text-gray-400 text-sm lowercase">
              @{profileData.currentUser.username}
            </p>
            <h4 className="text-slate-300 text-sm">
              {profileData.currentUser.bio || "not found"}
            </h4>
          </div>

          <p className="text-blue-500 flex items-center gap-2 hover:underline cursor-pointer text-sm">
            <FaLink />
            {profileData.currentUser.link || "unknown"}
          </p>

          {/* Followers Section */}
          <div className="flex gap-6 text-sm text-gray-300 mt-2">
            <p
              onClick={() => {
                setPop(!pop);
                setTabType("Followers");
              }}
              className="hover:underline cursor-pointer"
            >
              <span className="text-white font-semibold">
                {profileData.currentUser.followers.length}
              </span>{" "}
              Followers
            </p>
            <p
              onClick={() => {
                setTabType("Following");
                setPop(!pop);
              }}
              className="hover:underline cursor-pointer"
            >
              <span className="text-white font-semibold">
                {profileData.currentUser.following.length}
              </span>{" "}
              Following
            </p>
          </div>
          {feedArray && pop && (
            <div className="rounded bg-slate-950 flex flex-col gap-3">
              {feedArray.map((usr) => (
                <div key={usr.id}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10  bg-blue-600 text-white rounded-full flex items-center justify-center border-1 border-black">
                      {usr.username[0].toUpperCase()}
                    </div>
                    <h1>{usr.username}</h1>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ProfilePage;
