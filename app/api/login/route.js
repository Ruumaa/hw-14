import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (req, { params }) => {
  try {
    const { email, password } = await req.json();

    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUser) {
      return NextResponse.json({ msg: "User Not Found" }, { status: 404 });
    }

    const validPassword = bcrypt.compareSync(password, findUser.password);
    if (validPassword) {
      const accessToken = jwt.sign(
        {
          id: findUser.id,
          email: findUser.email,
        },
        process.env.JWT_SECRET_KEY
      );

      //set cookies selama 1 minggu
      cookies().set({
        name: "accessToken",
        value: accessToken,
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json(
        {
          id: findUser.id,
          email: findUser.email,
          accessToken,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { msg: "Invalid email or password" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
};
