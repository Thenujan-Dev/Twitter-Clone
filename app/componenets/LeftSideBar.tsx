"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaHome, FaUser } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { useGlobalContext } from "../context/Context";
import useLogout from "../hooks/useLogout";
type active = "Home" | "Notification" | "Profile";
const LeftSideBar = () => {
  const [activeBar, setActiveBar] = useState<active>("Home");
  const { authUser } = useGlobalContext();
  const { mutate: LogoutUser } = useLogout();
  return (
    <div className="flex flex-col h-full gap-14 items-center pt-10">
      <div className="">
        <BsTwitterX className="text-6xl text-blue-600" />
      </div>
      <div className="flex flex-col gap-5">
        <li
          className={`flex list-none gap-3 items-center px-3 py-1 rounded transition-all duration-300 ease-linear hover:bg-blue-300 ${
            activeBar == "Home" && "bg-blue-700 hover:bg-blue-700"
          }`}
          onClick={() => setActiveBar("Home")}
        >
          <FaHome className="text-3xl" />
          <Link href={"/"}>Home</Link>
        </li>
        <li
          className={`flex list-none gap-3 items-center px-3 py-1 rounded transition-all duration-300 ease-linear hover:bg-blue-300 ${
            activeBar == "Notification" && "bg-blue-700 hover:bg-blue-700"
          }`}
          onClick={() => setActiveBar("Notification")}
        >
          <IoNotifications className="text-3xl" />
          <Link href={"/pages/notification"}>Notifications</Link>
        </li>
        <li
          className={`flex list-none gap-3 items-center px-3 py-1 rounded transition-all duration-300 ease-linear hover:bg-blue-300 ${
            activeBar == "Profile" && "bg-blue-700 hover:bg-blue-700"
          }`}
          onClick={() => setActiveBar("Profile")}
        >
          <FaUser className="text-3xl" />
          <Link href={"/pages/profile"}>Profile</Link>
        </li>
      </div>

      <div className="mt-40 flex items-center justify-between w-full p-3 rounded-xl hover:bg-zinc-800 transition-all duration-300">
        {/* Left: Avatar + Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center bg-pink-500 text-white text-sm font-bold rounded-full">
            {authUser.username[0] || "T"}
          </div>
          <div className="leading-snug">
            <h1 className="text-sm  capitalize font-bold">
              {authUser.username || "Thenujan"}
            </h1>
            <p className="text-xs text-gray-400">
              @{authUser.username.toLowerCase() || "thenu"}
            </p>
          </div>
        </div>

        {/* Right: Logout icon */}
        <IoLogOut
          className="text-3xl text-red-400 hover:text-red-500 transition duration-200 cursor-pointer"
          onClick={() => LogoutUser()}
        />
      </div>
    </div>
  );
};

export default LeftSideBar;
