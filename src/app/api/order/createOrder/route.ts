import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {  User } from "@prisma/client";
import { sendWhatsAppMessage } from "@/services/whatsappService";

import prisma from "@/../prisma/prisma";

interface PaymentDetails {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface OrderItemWithSize {
  name: string;
  quantity: number;
  price: number;
  productId: string;
  sizeId: string;
  size: string;
}

export async function POST(request: NextRequest) {
  try {
    const { payment } = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }: PaymentDetails = payment;

    // Verify payment signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Payment signature mismatch.");
      return NextResponse.json(
        { message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Store payment record in database
    const paymentData = await prisma.payment.create({
      data: { razorpay_payment_id, razorpay_order_id, razorpay_signature },
    });


    // Fetch temp order or order details from Razorpay
    const tempOrder = await prisma.tempOrders.findUnique({
      where: { orderId: razorpay_order_id },
    });

    if (!tempOrder) {
      return NextResponse.json({ message: "Oder not found" }, { status: 400 });
    }
    const orderItems:OrderItemWithSize[] = JSON.parse(tempOrder.orderItems);
    const updateSizes:any[] = JSON.parse(tempOrder.updateProducts);
    const amount:number = tempOrder.totalAmount;
    let user:User = JSON.parse(tempOrder.user);
    user.phoneNumber = BigInt(user.phoneNumber);

    // Create order in the database
    const order = await prisma.order.create({
      data: {
        status: "PENDING",
        totalAmount: amount,
        userId: user.id,
        paymentId: paymentData.id,
        items: {
          create: orderItems.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            productId: item.productId,
            sizeId: item.sizeId,
          })),
        },
      },
    });

    // Update product size quantities and delete temp order in a transaction
    await prisma.$transaction(async (prisma) => {
      await Promise.all(
        updateSizes.map((update) => prisma.productSize.update(update))
      );

      if (tempOrder) {
        await prisma.tempOrders.delete({ where: { id: tempOrder.id } });
      }
    });

    if (user) {
      sendWhatsAppMessage(
        `91${user.phoneNumber.toString()}`,
        process.env.WHATSAPP_ADMIN_PHONE_NUMBER || "919307655505",
        {
          userName: user.name,
          orderId: order.id,
          totalAmount: order.totalAmount,
          products: orderItems,
        }
      );
    }

    return NextResponse.json(
      { message: "Payment verified and order created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
