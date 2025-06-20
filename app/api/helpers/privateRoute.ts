import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
export const privateRoute = async (
  cb: (user: { id: string }) => Promise<NextResponse>
) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Authorized",
        },
        { status: 401 }
      );
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        {
          success: false,
          message: "secret not provided",
        },
        { status: 401 }
      );
    }
    jwt.verify(token, secret);
    const decodedToken = jwt.decode(token) as JwtPayload & { id: string };
    const user = {
      id: decodedToken.id,
    };
    return cb(user);
  } catch (error) {
    const err = error as any;
    console.log({ name: err.name });
    if (err.name === "JsonWebTokenError") {
      return NextResponse.json(
        {
          code: "invalid-token",
          message: "The token you provide is not valid.",
        },
        { status: 401 }
      );
    }
    if (err.name === "TokenExpiredError") {
      return NextResponse.json(
        {
          code: "token-expired",
          message: "The token you provide has been expired.",
        },
        { status: 401 }
      );
    }
  }
};
