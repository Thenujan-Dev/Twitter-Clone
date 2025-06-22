import { useQuery } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";
import { RequestUserData } from "../UITypes/types";

const useGetProfileData = () => {
  const GetProfileData = async (): Promise<RequestUserData> => {
    const response = await api.get("/user/profile");
    const data = await response.data;
    return data;
  };
  return useQuery({
    queryKey: ["get-profile-data"],
    queryFn: GetProfileData,
  });
};

export default useGetProfileData;
