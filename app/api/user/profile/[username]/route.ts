import { handleError } from "@/app/api/helpers/handleError";
import { privateRoute } from "@/app/api/helpers/privateRoute";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    return await privateRoute(async (user: { id: string }) => {
      const usernameStr = req.url;
      const username = usernameStr.split("profile/")[1];

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
      const requestUser = await prisma.user.findUnique({
        where: { username: username },
      });
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
      if (!requestUser) {
        return NextResponse.json(
          {
            success: false,
            message: "request user not found",
          },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          requestUser,
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
