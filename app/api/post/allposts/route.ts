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

      const allPosts = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Comment: {
            select: {
              text: true,
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
          Like: {
            omit: {
              userId: true,
              postId: true,
              id: true,
              createdAt: true,
            },
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      });

      return NextResponse.json(
        {
          success: true,
          allPosts,
        },
        { status: 200 }
      );
    });
  } catch (error) {
    return handleError({
      error,
      defaultError: "Failed to get All Posts",
    });
  }
};
