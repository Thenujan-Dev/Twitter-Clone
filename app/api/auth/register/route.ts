import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../helpers/handleError";
import UserRegisterSchema from "@/schemas/user.register.schema";
import { hash } from "argon2";
import prisma from "@/lib/prisma";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = UserRegisterSchema.parse(body);
    const hashedPassword = await hash(validatedData.password);
    const isEmailExist = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    const isUsernameExist = await prisma.user.findUnique({
      where: { username: validatedData.username },
    });
    if (isEmailExist || isUsernameExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Username OR Email dublicated",
        },
        { status: 409 }
      );
    }
    const newUser = await prisma.user.create({
      data: { ...validatedData, password: hashedPassword },
    });
    return NextResponse.json(
      {
        success: true,
        message: "User Created Successfully!",
        newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError({
      error,
      defaultError: "Failed to Register User",
    });
  }
};
