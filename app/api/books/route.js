import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import prisma from "@/app/lib/prisma";

export const POST = async (request) => {
  try {
    // const body = await request.json()
    const body = await request.formData();
    const file = body.get("image");
    if (!file) {
      return NextResponse.json(
        { success: false },
        { error: "File tidak valid" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imagePath = Date.now() + file.name;
    const path = process.cwd() + "/public/" + imagePath;
    await writeFile(path, buffer);

    const books = await prisma.book.create({
      data: {
        title: body.get("title"),
        author: body.get("author"),
        publisher: body.get("publisher"),
        year: Number(body.get("year")),
        pages: Number(body.get("pages")),
        image: `http://localhost:3000/${imagePath}`,
      },
    });
    return NextResponse.json(
      { msg: "Book created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat memproses permintaan" },
      { status: 500 }
    );
  }
};
