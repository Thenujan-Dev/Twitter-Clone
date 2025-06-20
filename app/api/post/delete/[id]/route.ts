import { handleError } from "@/app/api/helpers/handleError";
import { privateRoute } from "@/app/api/helpers/privateRoute";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
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
      const postId = postIdStr.split("delete/")[1];
      const dltPost = await prisma.post.findUnique({ where: { id: postId } });
      const postautherId = dltPost?.userId.toString();
      if (currentUserId !== postautherId) {
        return NextResponse.json(
          {
            success: false,
            message: "You Are Not Authorized to delete Post",
          },
          { status: 400 }
        );
      }
      await prisma.post.delete({ where: { id: postId } });
      return NextResponse.json(
        {
          success: true,
          message: "Post deleted successfully!",
        },
        { status: 201 }
      );
    });
  } catch (error) {
    return handleError({ error, defaultError: "Failed to Delete Post" });
  }
};
