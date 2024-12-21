import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { size, price, imageUrl, quantity } = body;

        if (!id) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }
        const newProductSize = await prisma.productSize.create({
            data: {
                size,
                price,
                imageUrl,
                quantity,
                product: {
                    connect: {
                        id
                    }
                }
            }
        });
        return NextResponse.json(newProductSize, { status: 201 });
    }catch (error) {
        console.error("Error creating product size: ", error);
        return NextResponse.json({ error: "Error creating product size" }, { status: 500 });
    }

}