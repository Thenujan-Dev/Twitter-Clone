import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../../helpers/handleError";
import { privateRoute } from "../../../helpers/privateRoute";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { text } = await req.json();
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
      const postId = postIdStr.split("comment/")[1];
      const commentPost = await prisma.post.findUnique({
        where: { id: postId },
        include: { Like: true },
      });

      if (!commentPost) {
        return NextResponse.json(
          {
            success: false,
            message: "Post Not Found",
          },
          { status: 404 }
        );
      }
      await prisma.comment.create({
        data: {
          text: text,
          userId: currentUserId,
          postId: postId,
        },
      });
      return NextResponse.json(
        {
          success: true,
          message: "commentd successfully!",
        },
        { status: 200 }
      );
    });
  } catch (error) {
    return handleError({
      error,
      defaultError: "Failed to comment to the post",
    });
  }
};
