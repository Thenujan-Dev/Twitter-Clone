"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";

import { authUserType } from "../UITypes/types";

const useGetAuthUser = () => {
  const GetAuthUser = async (): Promise<{ currentUser: authUserType }> => {
    const response = await api.get("/auth/whoami");
    const data = await response.data;
    return data;
  };
  return useQuery({
    queryKey: ["get-auth-user"],
    queryFn: GetAuthUser,
  });
};

export default useGetAuthUser;
