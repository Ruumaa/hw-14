import { NextResponse } from "next/server";
import { data } from "autoprefixer";
import prisma from "@/app/lib/prisma";

export const PATCH = async (req, {params}) => {
    const body = await req.json();
  const book = await prisma.book.update({
    where: { id: Number(params.id) },
    data:{
        title:body.title,
        author:body.author,
        publisher:body.publisher,
        year:body.year,
        pages:body.pages,
        image:body.image,
      }
  });
  return NextResponse.json(data,{status: 200});
};
export const DELETE = async (req, {params}) => {
  const book = await prisma.book.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(data,{status: 200});
};
