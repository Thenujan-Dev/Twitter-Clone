"use client";
import { useQuery } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";
import { NotificationType } from "../UITypes/types";

const useGetNotifications = () => {
  const GetAllNotification = async (): Promise<{
    notifications: NotificationType[];
  }> => {
    const response = await api.get("/notification");
    const data = await response.data;
    return data;
  };
  return useQuery({
    queryKey: ["get-All-Notifications"],
    queryFn: GetAllNotification,
  });
};

export default useGetNotifications;
