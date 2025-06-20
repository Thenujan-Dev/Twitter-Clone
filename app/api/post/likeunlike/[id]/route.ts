import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../../helpers/handleError";
import { privateRoute } from "../../../helpers/privateRoute";
import prisma from "@/lib/prisma";

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

      const postIdStr = req.url;
      const postId = postIdStr.split("likeunlike/")[1];
      const likepost = await prisma.post.findUnique({
        where: { id: postId },
        include: { Like: true },
      });

      if (!likepost) {
        return NextResponse.json(
          {
            success: false,
            message: "Post Not Found",
          },
          { status: 404 }
        );
      }
      const isUserAlreadyLiked = likepost.Like.some(
        (id) => id.userId == currentUserId
      );
      if (isUserAlreadyLiked) {
        //unlike
        await prisma.like.deleteMany({ where: { userId: currentUserId } });
        return NextResponse.json({
          success: true,
          message: "Post Unliked successfully",
        });
      } else {
        //like
        await prisma.like.create({
          data: { postId: postId, userId: currentUserId },
        });
        await prisma.notification.create({
          data: {
            from: currentUserId,
            to: likepost.userId,
            type: "Like",
          },
        });
        return NextResponse.json({
          success: true,
          message: "Post Liked successfully",
        });
      }
    });
  } catch (error) {
    return handleError({
      error,
      defaultError: "Failed to Like Unlike the Posts",
    });
  }
};
