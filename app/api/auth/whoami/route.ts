import prisma from "@/lib/prisma";
import { handleError } from "../../helpers/handleError";
import { privateRoute } from "../../helpers/privateRoute";
import { NextResponse } from "next/server";

export const GET = async () => {
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
            message: "User not found",
          },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          currentUser,
        },
        { status: 200 }
      );
    });
  } catch (error) {
    return handleError({ error, defaultError: "Failed to get who am i" });
  }
};
