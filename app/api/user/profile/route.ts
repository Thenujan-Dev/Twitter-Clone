import { handleError } from "@/app/api/helpers/handleError";
import { privateRoute } from "@/app/api/helpers/privateRoute";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
            message: "user not logged in",
          },
          { status: 400 }
        );
      }

      const followers = await prisma.user.findMany({
        where: { id: { in: currentUser?.followers } },
        select: { username: true, id: true },
      });
      const following = await prisma.user.findMany({
        where: {
          id: {
            in: currentUser.following,
          },
        },
        select: {
          id: true,
          username: true,
        },
      });

      return NextResponse.json(
        {
          success: true,
          currentUser,
          followers,
          following,
        },
        { status: 200 }
      );
    });
  } catch (error) {
    return handleError({ error, defaultError: "Failed to get profile data" });
  }
};
