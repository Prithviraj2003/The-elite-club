import { ProductSize } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { sizeId: string } }
) {
  try {
    const { sizeId } = params;
    const body = await request.json();
    const { size, price, quantity } = body;

    if (!sizeId) {
      return NextResponse.json(
        { error: "Size ID is required" },
        { status: 400 }
      );
    }

    const updatedSize: ProductSize = await prisma.productSize.update({
      where: {
        id: sizeId,
      },
      data: {
        size,
        price,
        quantity,
        updatedAt: new Date(),
      },
    });

    await prisma.$disconnect();

    return NextResponse.json(updatedSize);
  } catch (error) {
    console.error("Error updating product: ", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sizeId: string } }
) {
  try {
    const { sizeId } = params;

    if (!sizeId) {
      return NextResponse.json(
        { error: "Size ID is required" },
        { status: 400 }
      );
    }

    await prisma.productSize.delete({
      where: {
        id: sizeId,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({ message: "Product size deleted" });
  } catch (error) {
    console.error("Error deleting product size: ", error);
    return NextResponse.json(
      { error: "Error deleting product size" },
      { status: 500 }
    );
  }
}
