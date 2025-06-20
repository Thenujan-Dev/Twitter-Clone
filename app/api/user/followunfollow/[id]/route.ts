import { handleError } from "@/app/api/helpers/handleError";
import { privateRoute } from "@/app/api/helpers/privateRoute";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

      const requestUserId = req.url?.split("followunfollow/")[1] ?? "";
      if (!requestUserId) {
        return NextResponse.json(
          {
            success: false,
            message: "Requested user ID not found",
          },
          { status: 400 }
        );
      }

      const requestedUser = await prisma.user.findUnique({
        where: { id: requestUserId },
      });

      if (!requestedUser) {
        return NextResponse.json(
          {
            success: false,
            message: "Requested user not found",
          },
          { status: 400 }
        );
      }

      if (requestUserId === currentUserId) {
        return NextResponse.json(
          {
            success: false,
            message: "you cant Follow yourself",
          },
          { status: 400 }
        );
      }

      const isAlreadyFollowed = currentUser.following.includes(requestUserId);

      if (isAlreadyFollowed) {
        await prisma.user.update({
          where: { id: currentUserId },
          data: {
            following: {
              set: currentUser.following.filter((id) => id !== requestUserId),
            },
          },
        });
        await prisma.user.update({
          where: { id: requestUserId },
          data: {
            followers: {
              set: requestedUser.followers.filter((id) => id !== currentUserId),
            },
          },
        });
        return NextResponse.json({
          success: true,
          message: "user unfollowed successfully!",
        });
      } else {
        await prisma.user.update({
          where: { id: currentUserId },
          data: {
            following: { set: [...currentUser.following, requestUserId] },
          },
        });
        await prisma.user.update({
          where: { id: requestUserId },
          data: {
            followers: {
              set: [...requestedUser.followers, currentUserId],
            },
          },
        });
        await prisma.notification.create({
          data: { from: currentUserId, to: requestUserId, type: "Follow" },
        });
        return NextResponse.json(
          {
            success: true,
            message: "User Followed successfully",
          },
          { status: 200 }
        );
      }
    });
  } catch (error) {
    return handleError({
      error,
      defaultError: "Failed to Follow Unfollow user",
    });
  }
};
