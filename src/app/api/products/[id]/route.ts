import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

//PATCH API to change Availabilty of the product
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const value = searchParams.get('value');

    if (value === null) {
      return NextResponse.json(
        { error: "Value parameter is required" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        availability: value === 'true',
      },
      include: {
        sizes: true,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product: ", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { name, description, price, availability, imageUrl, category } =
      await request.json();

    if (!name || !description || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        availability,
        imageUrl,
        category,
      },
      include: {
        sizes: true,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product: ", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        sizes: true,
      }
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product: ", error);
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: 500 }
    );
  }
}
