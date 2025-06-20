import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../helpers/handleError";
import { privateRoute } from "../../helpers/privateRoute";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
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
      const allUserNotCurrentUSer = await prisma.user.findMany({
        where: { id: { not: currentUserId } },
      });
      const filteredUsers = allUserNotCurrentUSer.filter(
        (user) => !currentUser.following.includes(user.id)
      );
      return NextResponse.json(
        { success: true, filteredUsers },
        { status: 200 }
      );
    });
  } catch (error) {
    return handleError({
      error,
      defaultError: "Failed to get suggested users to Follow",
    });
  }
};
