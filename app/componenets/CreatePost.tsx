"use client";
import PostSchema, { PostSchemaType } from "@/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../context/Context";
import useCreatePost from "../hooks/useCreatePost";

const CreatePost = () => {
  const { authUser } = useGlobalContext();
  const {
    handleSubmit,
    formState: { isValid, errors },
    reset,
    register,
  } = useForm<PostSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(PostSchema),
  });
  const { mutate: createPost, isPending: createPostLoading } = useCreatePost();
  return (
    <div className="w-full bg-black text-white p-4 h-fit">
      <form
        className="max-w-3xl mx-auto flex gap-4"
        onSubmit={handleSubmit((PostData) => {
          createPost({ PostData, reset });
        })}
      >
        {/* Profile Circle */}
        <div className="w-10 h-10 bg-white text-red-500 rounded-full flex items-center justify-center font-bold text-lg">
          {authUser.username[0] || "unknowns"}
        </div>

        {/* Input Fields and Button */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Title */}
          <TextField
            label="Title"
            size="small"
            {...register("title")}
            helperText={errors.title?.message}
            error={!!errors.title?.message}
            fullWidth
            variant="outlined"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.05)",
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.5)",
                },
              },
            }}
          />

          {/* Body */}
          <TextField
            label="What's on your mind?"
            size="small"
            rows={4}
            multiline
            fullWidth
            {...register("body")}
            helperText={errors.body?.message}
            error={!!errors.body?.message}
            variant="outlined"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.05)",
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.5)",
                },
              },
            }}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              variant="contained"
              type="submit"
              disabled={!isValid}
              sx={{
                borderRadius: "999px",
                paddingX: 3,
                backgroundColor: "#ffffff",
                color: "#ef4444", // Tailwind red-500
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#fca5a5",
                },
              }}
            >
              {createPostLoading ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
