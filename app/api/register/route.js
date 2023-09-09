import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  const body = await req.json();
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(body.password, salt);

  const existingEmail = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (existingEmail) {
    return NextResponse.json({ msg: "Email Already Exist" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPassword,
      },
    });

    return NextResponse.json(
      { msg: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
};
