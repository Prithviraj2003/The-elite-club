import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/prisma";
import { Product, Sizes } from "@prisma/client";

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
export async function POST(request: NextRequest) {
  try {
    const { name, description, price, category, sizes } = await request.json();

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !sizes ||
      !Array.isArray(sizes)
    ) {
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
        category,
        availability: true,
        sizes: {
          create: sizes.map(
            (size: {
              size: Sizes;
              price: number;
              quantity: number;
              imageUrl?: string;
            }) => ({
              size: size.size,
              price: size.price,
              quantity: size.quantity,
              imageUrl: size.imageUrl,
            })
          ),
        },
      },
      include: {
        sizes: true,
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

//Example payload for POST api :
//{
//   "name": "Classic T-Shirt",
//   "description": "A comfortable cotton t-shirt for everyday wear",
//   "price": 29.99,
//   "category": "CLOTHING",
//   "sizes": [
//     {
//       "size": "S",
//       "price": 29.99,
//       "quantity": 50,
//       "imageUrl": "https://example.com/tshirt-small.jpg"
//     },
//     {
//       "size": "M",
//       "price": 29.99,
//       "quantity": 75,
//       "imageUrl": "https://example.com/tshirt-medium.jpg"
//     },
//     {
//       "size": "L",
//       "price": 29.99,
//       "quantity": 60,
//       "imageUrl": "https://example.com/tshirt-large.jpg"
//     }
//   ]
// }
