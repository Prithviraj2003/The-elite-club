const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addUsers = async () => {
  try {
    const users = await prisma.user.createMany({
      data: [
        {
          name: "Gautham",
          phoneNumber: 9845398233,
          role: "USER",
        },
        {
          name: "Alice",
          phoneNumber: 9876543210,
          role: "ADMIN",
        },
        {
          name: "Bob",
          phoneNumber: 9123456789,
          role: "USER",
        },
      ],
    });
    console.log("Users created: ", users);
  } catch (error) {
    console.error("Error creating users: ", error);
  }
};

const fetchAndAddProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const products = data;

    for (const product of products) {
      // First create the main product
      const createdProduct = await prisma.product.create({
        data: {
          name: product.title,
          description: product.description,
          price: product.price,
          availability: true,
          category: "CLOTHING",
          imageUrl: product.image,
          // Add sizes for each product
          sizes: {
            create: [
              {
                size: "S",
                price: product.price,
                quantity: Math.floor(Math.random() * 100) + 1,
                imageUrl: product.image,
              },
              {
                size: "M",
                price: product.price * 1.1,
                quantity: Math.floor(Math.random() * 100) + 1,
                imageUrl: product.image,
              },
              {
                size: "L",
                price: product.price * 1.2,
                quantity: Math.floor(Math.random() * 100) + 1,
                imageUrl: product.image,
              },
            ],
          },
        },
      });
    }

    console.log("Products and sizes created");
  } catch (error) {
    console.error("Error fetching/adding products: ", error);
  }
};

const addOrdersAndPayments = async () => {
  try {
    const users = await prisma.user.findMany();
    const products = await prisma.product.findMany({
      include: { sizes: true },
    });

    // Create payment first
    const payment = await prisma.payment.create({
      data: {
        razorpay_payment_id: "pay_29QQoUBi66xm2f",
        razorpay_order_id: "order_DBJOWzybf0sJbb",
        razorpay_signature: "e7ecf544e1e4b17c",
      },
    });

    // Create orders with payment connection
    const orders = await Promise.all([
      prisma.order.create({
        data: {
          totalAmount: 150.0,
          status: "PENDING",
          userId: users[0].id,
          paymentId: payment.id,
        },
      }),
      prisma.order.create({
        data: {
          totalAmount: 300.0,
          status: "SHIPPED",
          userId: users[1].id,
          paymentId: payment.id,
        },
      }),
    ]);

    // Create order items with size references
    const orderItems = [
      {
        quantity: 2,
        price: products[0].price,
        productId: products[0].id,
        orderId: orders[0].id,
        sizeId: products[0].sizes[0].id, // Using first size
      },
      {
        quantity: 1,
        price: products[1].price,
        productId: products[1].id,
        orderId: orders[0].id,
        sizeId: products[1].sizes[0].id,
      },
    ];

    for (const item of orderItems) {
      await prisma.orderItem.create({
        data: item,
      });
    }

    console.log("Orders, payments, and items created");
  } catch (error) {
    console.error("Error creating orders and payments: ", error);
  }
};

async function main() {
  await addUsers();
  await fetchAndAddProducts();
  await addOrdersAndPayments();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
