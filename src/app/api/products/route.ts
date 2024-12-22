import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";
import { Product } from "@prisma/client";

export async function GET() {
  try {
    const products: Product[] = await prisma.product.findMany({
      include: {
        sizes: true,
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products: ", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  if (!body.id || !body.size || !body.quantity) {
    return NextResponse.json(
      {
        error: "Details missing",
      },
      { status: 400 }
    );
  }
  try {
    const updateQuantity = await prisma.productSize.update({
      where: {
        id: body.id,
        size: body.size,
      },
      data: {
        quantity: body.quantity,
      },
    });
    return NextResponse.json(
      {
        updateQuantity,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, price, quantity, imageUrl, category } =
      await request.json();

    if (!name || !description || !price || !quantity || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        category,
        availability: true,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product: ", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}
