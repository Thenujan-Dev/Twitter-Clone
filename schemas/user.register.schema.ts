import { z } from "zod";

const UserRegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export type UserRegisterResponse = z.infer<typeof UserRegisterSchema>;
export default UserRegisterSchema;
