"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import useGetNotifications from "../hooks/useGetNotifications";
import { NotificationType } from "../UITypes/types";
import useDeleteNotifications from "../hooks/useDeleteNotifications";
import { CircularProgress } from "@mui/material";

const NotificationPage = () => {
  const { data: allNotifications, isLoading: notifiLoading } =
    useGetNotifications();
  const { mutate: DeleteNoti, isPending: DeleteNotiLoading } =
    useDeleteNotifications();
  const [opn, setOpn] = useState(false);
  const [noti, setNoti] = useState<NotificationType[]>();

  useEffect(() => {
    if (allNotifications) {
      setNoti(allNotifications?.notifications);
    }
  }, [allNotifications]);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between border-b border-slate-400 py-2 px-4">
        <h4 className="capitalize font-semibold text-left text-lg">
          Notifications
        </h4>
        <div className="flex gap-2 transition-all duration-500">
          <div
            className={`${
              opn ? "block" : "hidden"
            } capitalize cursor-pointer bg-slate-800 text-slate-400 py-1 px-3 rounded-lg transition-all duration-500 transform`}
            onClick={() => DeleteNoti()}
          >
            {DeleteNotiLoading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Delete All Notification"
            )}
          </div>
          <MdOutlineSettings
            onClick={() => setOpn(!opn)}
            className="text-2xl cursor-pointer text-slate-200 hover:text-slate-600 "
          />
        </div>
      </div>

      {noti?.length ? (
        <div className="p-4 space-y-4">
          {noti.map((n) => (
            <div
              key={n.id}
              className="flex items-center space-x-4 p-3 rounded-lg border border-gray-200  transition"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-lg uppercase">
                {n.message[0]}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300">
                  {n.message}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40 text-gray-500">
          <p>No Notifications</p>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
