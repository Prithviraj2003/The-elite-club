import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.error("Error deleting product: ", error);
    return NextResponse.json({ error: "Error deleting product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, description, price, quantity, imageUrl, category } = await request.json();

    if (!name || !description || !price || !quantity || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        quantity,
        imageUrl,
        category,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product: ", error);
    return NextResponse.json({ error: "Error updating product" }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }){
    try {
        const { id } = params;
    
        const product = await prisma.product.findUnique({
        where: { id },
        });
    
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Error fetching product: ", error);
        return NextResponse.json({ error: "Error fetching product" }, { status: 500 });
    }
}