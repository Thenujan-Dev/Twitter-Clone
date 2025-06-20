import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../helpers/handleError";
import { privateRoute } from "../../helpers/privateRoute";
import prisma from "@/lib/prisma";
import { verify, hash } from "argon2";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    return await privateRoute(async (user: { id: string }) => {
      const currentUserId = user.id;

      const currentUser = await prisma.user.findUnique({
        where: { id: currentUserId },
      });

      if (!currentUser) {
        return NextResponse.json(
          {
            success: false,
            message: "user not logged in",
          },
          { status: 400 }
        );
      }
      const {
        newUsername,
        newEmail,
        newPassoword,
        currentPassword,
        newBio,
        newLink,
      } = await req.json();
      if (
        (currentPassword && !newPassoword) ||
        (newPassoword && !currentPassword)
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "your have to provide both new password and current password",
          },
          { status: 400 }
        );
      }
      if (currentPassword && newPassoword) {
        const passwordValidation = z
          .string()
          .min(8, { message: "Password must be at least 8 characters long" })
          .regex(/[a-z]/, {
            message: "Password must contain a lowercase letter",
          })
          .regex(/[A-Z]/, {
            message: "Password must contain an uppercase letter",
          })
          .regex(/[0-9]/, { message: "Password must contain a number" })
          .regex(/[^a-zA-Z0-9]/, {
            message: "Password must contain a special character",
          })
          .nonempty({ message: "Password is required" });

        const result = passwordValidation.safeParse(newPassoword);
        if (!result.success) {
          return NextResponse.json(
            {
              success: false,
              message: result.error.issues[0].message,
            },
            { status: 400 }
          );
        }

        const isMatch = await verify(currentUser.password, currentPassword);
        if (!isMatch) {
          return NextResponse.json(
            {
              success: false,
              message: "Your current Password is invalid",
            },
            { status: 400 }
          );
        }
        const hashedNewPassword = await hash(newPassoword);
        await prisma.user.update({
          where: { id: currentUserId },
          data: { password: hashedNewPassword },
        });
      }

      await prisma.user.update({
        where: { id: currentUserId },
        data: {
          username: newUsername || currentUser.username,
          email: newEmail || currentUser.email,
          bio: newBio || currentUser.bio,
          link: newLink || currentUser.link,
        },
      });
      return NextResponse.json(
        {
          success: true,
          message: "user Updated Successfully!",
        },
        { status: 200 }
      );
    });
  } catch (error) {
    return handleError({ error, defaultError: "Failed to update Users" });
  }
};
