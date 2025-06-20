import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../helpers/handleError";
import PostSchema from "@/schemas/post.schema";
import prisma from "@/lib/prisma";
import { privateRoute } from "../../helpers/privateRoute";

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
      const body = await req.json();
      const validatedData = PostSchema.parse(body);
      const newPost = await prisma.post.create({
        data: {
          userId: currentUserId,
          ...validatedData,
        },
      });
      return NextResponse.json(
        {
          success: true,
          newPost,
        },
        { status: 200 }
      );
    });
  } catch (error) {
    return handleError({ error, defaultError: "Failed to create Post" });
  }
};
