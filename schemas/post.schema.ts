import { z } from "zod";

const PostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .refine((val) => val.trim().split(/\s+/).length >= 4, {
      message: "Title must be at least 4 words",
    }),
  body: z
    .string()
    .min(1, "Body is required")
    .refine((val) => val.trim().split(/\s+/).length >= 60, {
      message: "Body must be at least 60 words",
    }),
});

export default PostSchema;
