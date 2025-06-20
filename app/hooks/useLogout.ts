"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";
import toast from "react-hot-toast";

const useLogout = () => {
  const queyClient = useQueryClient();
  const LogoutUser = async () => {
    try {
      const response = await api.post("/auth/logout");
      const data: { success: boolean } = await response.data;
      if (data.success) {
        toast.success("Logout successfull!");
      }
      return data;
    } catch (error) {
      toast.error("Something Error");
    }
  };
  return useMutation({
    mutationFn: LogoutUser,
    onSuccess: () => {
      queyClient.invalidateQueries({ queryKey: ["get-auth-user"] });
    },
  });
};

export default useLogout;
