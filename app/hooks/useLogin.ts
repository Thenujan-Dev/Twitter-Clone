"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/helpers/baseApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DeepPartial } from "react-hook-form";
import { UserRegisterResponse } from "@/schemas/user.register.schema";
interface LoginInput {
  email: string;
  password: string;
}
const useLogin = () => {
  const queyClient = useQueryClient();
  const router = useRouter();
  const LoginUser = async ({
    FormData,
    reset,
  }: {
    FormData: LoginInput;
    reset: (values?: DeepPartial<UserRegisterResponse>) => void;
  }) => {
    try {
      const response = await api.post("/auth/login", FormData);
      const data: {
        success: boolean;
        message: string;
      } = await response.data;
      if (data.success) {
        toast.success(data.message);
        reset();
        router.push("/");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error: any) {
      toast.error("Invalid Credentials");
    }
  };
  return useMutation({
    mutationFn: LoginUser,
    onSuccess: () => {
      queyClient.invalidateQueries({ queryKey: ["get-auth-user"] });
    },
  });
};

export default useLogin;
