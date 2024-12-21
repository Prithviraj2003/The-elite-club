import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import {  ProductSize } from '@prisma/client'
import prisma from "@/../prisma/prisma";

interface OrderItem {
    itemId: string;
    sizeId: string;
    quantity: number;
}

interface RequestBody {
    order: OrderItem[];
}

interface ProductWithSize{
    id: string;
    name: string;
    sizes: ProductSize[];
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

const userId = process.env.TEMP_USER_ID || "672f83b06981c6e48f930ec7";

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as RequestBody;
        const { order } = body;

        if (!Array.isArray(order) || order.length === 0) {
            return NextResponse.json({ error: "Order must be a non-empty array" }, { status: 400 });
        }

        if (!userId || typeof userId !== "string") {
            return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch products and their sizes
        const productIds = order.map((item) => item.itemId);
        const sizeIds = order.map((item) => item.sizeId);

        const products:ProductWithSize[] = await prisma.product.findMany({
            where: { id: { in: productIds } },
            include: {
                sizes: {
                    where: { id: { in: sizeIds } }
                }
            }
        });
        console.log(products);
        let totalAmount = 0;

        for (const item of order) {
            const product = products.find(p => p.id === item.itemId);
            const size = product?.sizes.find(s => s.id === item.sizeId);

            if (!product || !size) {
                return NextResponse.json(
                    { error: `Product or size not found for product: ${product?.name}` },
                    { status: 400 }
                );
            }

            if (size.quantity < item.quantity) {
                return NextResponse.json(
                    { error: `Insufficient quantity for product: ${product.name}, size: ${size.size}` },
                    { status: 400 }
                );
            }

            totalAmount += size.price * item.quantity;
        }
        console.log("before : ",totalAmount);
        totalAmount = Math.round(totalAmount)
        console.log("After : ",totalAmount);
        const receipt = `${user.name},${user.phoneNumber},TA:${totalAmount}`.slice(0, 40);
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt,
        };

        const razorpayOrder:any =await razorpay.orders.create(options);
        console.log(razorpayOrder);
        // Store temporary order data
        await prisma.tempOrders.create({
            data: {
                orderId: razorpayOrder.id,
                orderItems: JSON.stringify(
                    order.map((item) => {
                        const product = products.find(p => p.id === item.itemId);
                        const size = product?.sizes.find(s => s.id === item.sizeId);
                        console.log(product,size)
                        return {
                            quantity: item.quantity,
                            price: size?.price,
                            productId: item.itemId,
                            sizeId: item.sizeId,
                            size:size?.size,
                            name: product?.name,
                        };
                    })
                ),
                updateProducts: JSON.stringify(
                    order.map((item) => ({
                        where: { id: item.sizeId },
                        data: {
                            quantity: { decrement: item.quantity },
                        },
                    }))
                ),
                user: JSON.stringify({...user, phoneNumber: user.phoneNumber.toString()}),
                totalAmount: totalAmount,
                createdAt: new Date(),
            },
        });

        return NextResponse.json(razorpayOrder);
    } catch (error) {
        console.error("Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
