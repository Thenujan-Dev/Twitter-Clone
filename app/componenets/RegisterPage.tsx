"use client";
import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { TextField, Button, InputAdornment } from "@mui/material";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserRegisterSchema, {
  UserRegisterResponse,
} from "@/schemas/user.register.schema";
import { useRegister } from "../hooks/useRegister";

const RegisterPage = () => {
  const { mutate: RegUser, isPending: RegisterButtonLoading } = useRegister();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm<UserRegisterResponse>({
    mode: "onTouched",
    resolver: zodResolver(UserRegisterSchema),
  });

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-zinc-900/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-16 flex flex-col md:flex-row gap-10 items-center">
        {/* Left Logo Section */}
        <div className="w-full md:w-[40%] flex items-center justify-center">
          <BsTwitterX className="text-white w-32 h-32 md:w-48 md:h-48" />
        </div>

        {/* Right Form Section */}
        <form
          className="w-full md:w-[60%] flex flex-col gap-6 items-center"
          onSubmit={handleSubmit((FormData) => {
            RegUser({ FormData, reset });
          })}
        >
          <h1 className="text-center font-extrabold capitalize text-3xl md:text-4xl text-white tracking-wide">
            Create Account
          </h1>

          <div className="w-full">
            <TextField
              label="Username"
              size="small"
              fullWidth
              {...register("username")}
              error={!!errors.username?.message}
              helperText={errors.username?.message}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser className="text-white" />
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
              label="Email"
              size="small"
              fullWidth
              {...register("email")}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
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
              {...register("password")}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              fullWidth
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
              type="submit"
              variant="contained"
              disabled={!isValid}
              fullWidth
              sx={{
                bgcolor: "#1d9bf0",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                py: 1.3,
                ":hover": { bgcolor: "#1a8cd8" },
              }}
            >
              {RegisterButtonLoading ? "Registering..." : "Register"}
            </Button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-300">Already have an account?</p>
            <Button
              type="button"
              variant="outlined"
              href="/pages/login"
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
              Login Here
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
