import { NextResponse } from "next/server";
import { data } from "autoprefixer";
import { writeFile } from "fs/promises";
import prisma from "@/app/lib/prisma";

export const PATCH = async (req, { params }) => {
  try {
    console.log({params})
    const body = await req.formData();
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

    const books = await prisma.book.update({
      where: {
        id: Number(params.id),
      },
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
      { msg: "Book updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat memproses permintaan" },
      { status: 500 }
    );
  }
};
export const DELETE = async (req, { params }) => {
  const book = await prisma.book.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(data, { status: 200 });
};
