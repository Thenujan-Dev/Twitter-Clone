"use client";
import { useQuery } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";
import { SuggestedUserType } from "../UITypes/types";

const useGetSuggestedUsers = () => {
  const GetAllSuggestedUsers = async (): Promise<{
    filteredUsers: SuggestedUserType[];
  }> => {
    const response = await api.get("/user/suggesteduser");
    const data = await response.data;
    return data;
  };
  return useQuery({
    queryKey: ["get-suggested-users"],
    queryFn: GetAllSuggestedUsers,
  });
};

export default useGetSuggestedUsers;
