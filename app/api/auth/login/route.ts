import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../helpers/handleError";
import { verify as verifyPassword } from "argon2";
import UserLoginSchema from "@/schemas/user.login.schema";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = UserLoginSchema.parse(body);
    const currentUSer = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    if (!currentUSer) {
      return NextResponse.json(
        {
          success: false,
          message: "invalid credentials",
        },
        { status: 404 }
      );
    }
    const passwordCorrect = await verifyPassword(
      currentUSer.password,
      validatedData.password
    );
    if (!passwordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "invalid credentials",
        },
        { status: 404 }
      );
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        {
          success: false,
          message: "JWT secret is not provided",
        },
        { status: 400 }
      );
    }
    const token = jwt.sign({ id: currentUSer.id }, secret, { expiresIn: "1d" });
    const response = NextResponse.json(
      {
        success: true,
        message: "User Login Successfully!",
        token,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    return handleError({ error, defaultError: "Failed to Login User" });
  }
};
