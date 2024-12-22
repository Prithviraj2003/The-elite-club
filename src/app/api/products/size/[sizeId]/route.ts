import { ProductSize } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function PUT(request: NextRequest, { params }: { params: { sizeId: string } }) {
  try {
    const { sizeId } = params;
    const body = await request.json();
    const { size, price, imageUrl, quantity } = body;

    if (!sizeId) {
      return NextResponse.json({ error: "Size ID is required" }, { status: 400 });
    }

    const updatedSize:ProductSize = await prisma.productSize.update({
      where: {
        id: sizeId,
      },
      data: {
        size,
        price,
        imageUrl,
        quantity,
        updatedAt: new Date(),
      },
    });

    await prisma.$disconnect();

    return NextResponse.json(updatedSize);
  } catch (error) {
    console.error("Error updating product: ", error);
    return NextResponse.json({ error: "Error updating product" }, { status: 500 });
  }
}
