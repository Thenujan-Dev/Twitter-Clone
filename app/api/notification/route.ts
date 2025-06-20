import prisma from "@/lib/prisma";
import { handleError } from "../helpers/handleError";
import { privateRoute } from "../helpers/privateRoute";
import { NextResponse } from "next/server";

export const DELETE = async () => {
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
      await prisma.notification.deleteMany();
      return NextResponse.json(
        {
          success: true,
          message: "all notifications are deleted",
        },
        { status: 200 }
      );
    });
  } catch (error) {
    return handleError({
      error,
      defaultError: "Failed to Delete notifications",
    });
  }
};

export const GET = async () => {
  try {
    return await privateRoute(async (user: { id: string }) => {
      const currentUserID = user.id;

      const currentUser = await prisma.user.findUnique({
        where: { id: currentUserID },
      });

      if (!currentUser) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }

      const notifications = await prisma.notification.findMany({
        where: { to: currentUserID },
        orderBy: { createdAt: "desc" },
      });

      if (notifications.length === 0) {
        return NextResponse.json(
          { success: true, notifications: [] },
          { status: 200 }
        );
      }

      const fromUserIds = Array.from(new Set(notifications.map((n) => n.from)));

      const fromUsers = await prisma.user.findMany({
        where: { id: { in: fromUserIds } },
        select: { id: true, username: true },
      });

      const idToUsernameMap: Record<string, string> = {};
      fromUsers.forEach((user) => {
        idToUsernameMap[user.id] = user.username;
      });

      const formattedNotifications = notifications.map((n) => {
        const username = idToUsernameMap[n.from] ?? "Someone";

        const message = (() => {
          switch (n.type) {
            case "Follow":
              return `${username} started following you`;
            case "Like":
              return `${username} liked your post`;
            default:
              return `${username} did something mysterious...`;
          }
        })();

        return {
          id: n.id,
          message,
          createdAt: n.createdAt,
        };
      });

      return NextResponse.json(
        {
          success: true,
          notifications: formattedNotifications,
        },
        { status: 200 }
      );
    });
  } catch (error) {
    return handleError({ error, defaultError: "Failed to get notifications" });
  }
};
