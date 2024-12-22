import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

export async function PUT(req: Request) {
  const body = await req.json();

  try {
    const changeAvailability = await prisma.product.update({
      where: { id: body.id },
      data: { availability: body.availability },
    });
    return NextResponse.json({ changeAvailability }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 400 }
    );
  }
}
