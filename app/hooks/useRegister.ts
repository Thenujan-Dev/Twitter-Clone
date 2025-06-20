"use client";
import { useMutation } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DeepPartial } from "react-hook-form";
import { UserRegisterResponse } from "@/schemas/user.register.schema";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const router = useRouter();
  const RegUser = async ({
    FormData,
    reset,
  }: {
    FormData: RegisterInput;
    reset: (values?: DeepPartial<UserRegisterResponse>) => void;
  }) => {
    try {
      const response = await api.post("/auth/register", FormData);
      const data: {
        success: boolean;
        message: string;
      } = await response.data;
      if (data.success) {
        toast.success(data.message);
        reset();
        router.push("/pages/login");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return useMutation({
    mutationFn: RegUser,
  });
};
