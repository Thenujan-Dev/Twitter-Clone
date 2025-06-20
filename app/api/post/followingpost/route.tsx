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
            message: "user not logged in",
          },
          { status: 400 }
        );
      }
      const followingUserIds = currentUser.following;
      const FollowingPosts = await prisma.post.findMany({
        where: { userId: { in: followingUserIds } },
      });

      return NextResponse.json(FollowingPosts);
    });
  } catch (error) {
    return handleError({
      error,
      defaultError: "Failed to fetch Following users's posts",
    });
  }
};
