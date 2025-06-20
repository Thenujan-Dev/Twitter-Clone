"use client";
import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { TextField, Button, InputAdornment } from "@mui/material";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserLoginSchema, {
  UserLoginResponse,
} from "@/schemas/user.login.schema";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const { mutate: LogUser, isPending } = useLogin();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<UserLoginResponse>({
    mode: "onTouched",
    resolver: zodResolver(UserLoginSchema),
  });
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-zinc-900/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-16 flex flex-col md:flex-row gap-10 items-center">
        {/* Left Logo Section */}
        <div className="w-full md:w-[40%] flex items-center justify-center">
          <BsTwitterX className="text-white w-28 h-28 md:w-40 md:h-40" />
        </div>

        {/* Right Form Section */}
        <form
          className="w-full md:w-[60%] flex flex-col gap-6 items-center"
          onSubmit={handleSubmit((FormData) => {
            LogUser({ FormData, reset });
          })}
        >
          <h1 className="text-center font-extrabold capitalize text-3xl md:text-4xl text-white tracking-wide">
            Login to your account
          </h1>

          <div className="w-full">
            <TextField
              label="Email"
              size="small"
              fullWidth
              {...register("email")}
              helperText={errors.email?.message}
              error={!!errors.email?.message}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                startAdornment: (
                  <InputAdornment position="start">
                    <MdEmail className="text-white" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#1d9bf0" },
                  "&.Mui-focused fieldset": { borderColor: "#1d9bf0" },
                },
                borderRadius: "5px",
              }}
            />
          </div>

          <div className="w-full">
            <TextField
              label="Password"
              type="password"
              size="small"
              fullWidth
              {...register("password")}
              helperText={errors.password?.message}
              error={!!errors.password?.message}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock className="text-white" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#1d9bf0" },
                  "&.Mui-focused fieldset": { borderColor: "#1d9bf0" },
                },
                borderRadius: "5px",
              }}
            />
          </div>

          <div className="w-full">
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={!isValid}
              sx={{
                bgcolor: "#1d9bf0",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                py: 1.3,
                ":hover": { bgcolor: "#1a8cd8" },
              }}
            >
              {isPending ? "Processing..." : "Login"}
            </Button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-300">Don't have an account?</p>
            <Button
              type="button"
              variant="outlined"
              href="/pages/register"
              sx={{
                mt: 1,
                borderColor: "#1d9bf0",
                color: "#1d9bf0",
                textTransform: "none",
                ":hover": {
                  borderColor: "#1a8cd8",
                  backgroundColor: "rgba(29, 155, 240, 0.1)",
                },
              }}
            >
              Register Here
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
