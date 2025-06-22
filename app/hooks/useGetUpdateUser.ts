"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";
import { EditProfileFormType } from "../UITypes/types";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

const useGetUpdateUser = ({
  setPop,
}: {
  setPop: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const updateUser = async ({
    UpdateData,
  }: {
    UpdateData: EditProfileFormType;
  }) => {
    try {
      const response = await api.post("/user/updateuser", UpdateData);
      const data: { success: boolean; message: string } = response.data;

      if (data.success) {
        toast.success(data.message);
        setPop(false);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-profile-data"] });
    },
  });
};

export default useGetUpdateUser;
