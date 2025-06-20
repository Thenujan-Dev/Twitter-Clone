import prisma from "@/lib/prisma";
import { handleError } from "../../helpers/handleError";
import { privateRoute } from "../../helpers/privateRoute";
import { NextResponse } from "next/server";

export const POST = async () => {
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
            message: "user not found",
          },
          { status: 404 }
        );
      }
      const response = NextResponse.json(
        {
          success: true,
          message: "user logout successfully!",
        },
        { status: 200 }
      );
      response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      });
      return response;
    });
  } catch (error) {
    return handleError({
      error,
      defaultError: "Failed to logout User",
    });
  }
};
