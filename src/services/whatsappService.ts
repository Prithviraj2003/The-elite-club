interface Product {
    name: string;
    quantity: number;
    price: number;
    size:string;
}

export const sendWhatsAppMessage = async (
    customerPhone: string,
    adminPhone: string,
    orderDetails: { userName: string; orderId: string; totalAmount: number; products: Product[] }
) => {
    const { WHATSAPP_BUSINESS_PHONE_NUMBER_ID, WHATSAPP_API_KEY } = process.env;

    if (!WHATSAPP_BUSINESS_PHONE_NUMBER_ID || !WHATSAPP_API_KEY) {
        throw new Error("Missing WhatsApp API configuration.");
    }

    // Generate messages for customer and admin
    const customerMessage = generateOrderMessage(orderDetails, "customer");
    const adminMessage = generateOrderMessage(orderDetails, "admin");

    // Send message to the customer
    await sendMessage(customerPhone, customerMessage);

    // Send message to the admin
    await sendMessage(adminPhone, adminMessage);

    console.log("Messages sent to both customer and admin.");
};

const sendMessage = async (phone: string, message: string) => {
    const response = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_BUSINESS_PHONE_NUMBER_ID}/messages`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messaging_product: "whatsapp",
            to: phone,
            text: {
                body: message,
            },
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error(`Failed to send message to ${phone}:`, error);
        throw new Error(`Failed to send WhatsApp message to ${phone}`);
    }
};

const generateOrderMessage = (
    orderDetails: { userName: string; orderId: string; totalAmount: number; products: Product[] },
    recipient: "customer" | "admin"
): string => {
    const { userName, orderId, totalAmount, products } = orderDetails;
    const productDetails = products
        .map(
            (product) =>
                `- ${product.name} (x${product.quantity}): ₹${product.price * product.quantity}`
        )
        .join("\n");

    if (recipient === "customer") {
        return `Hi *${userName}*,\n\nThank you for your order! Here are the details of your purchase:\n\n*Order Details:* \n- Order ID: ${orderId}\n- Total Amount: ₹${totalAmount}\n\n*Products:* \n${productDetails}\n\nYour order is being processed and will be updated soon.\n\nIf you have any questions, feel free to contact us.\n\nBest regards,\nYour Store Name`;
    } else {
        return `Hi Admin,\n\nA new order has been placed by *${userName}*:\n\n*Order Details:* \n- Order ID: ${orderId}\n- Total Amount: ₹${totalAmount}\n\n*Products:* \n${productDetails}`;
    }
};
