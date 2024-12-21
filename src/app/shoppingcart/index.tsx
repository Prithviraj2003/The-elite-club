"use client";
import Header from "../../components/Header";
import RelatedProductsSection from "./RelatedProductsSection";
import {
  Img,
  Text,
  Heading,
  Button,
  Separator,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { useCart } from "@/store/store";
import { Square } from "lucide-react";
import ProductDetails1 from "@/components/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// @ts-ignore
import { ShoppingCart } from "lucide-react";

export default function ShoppingCartPage() {
  const { cartItems, incrementItem, decrementItem } = useCart();
  const [CartItems, setCartItems] = useState<string[]>([])
  // const [cartItemsList, setcartItemsList] = useState<cartItem[]>([])
  const [isSelected, setisSelected] = useState<string[]>([]);
  const addEveryItemToList = () => {
    const data = CartItems.map((itm: any) => itm.id);
    setisSelected(data);
  };

  const localStorageItems = () => {
    const items: string[] = [];

    Object.keys(localStorage).forEach((k) => {
      if (k.length === 24) {
        const item = localStorage.getItem(k);
        if (item !== null) {
          console.log(JSON.parse(item));
          items.push(JSON.parse(item));
        }
      }
    });
    setCartItems(items);
  }
  const removeItems = () => {
    isSelected.forEach((itms) => {
      decrementItem({
        id: itms,
      }),
        localStorage.removeItem(itms)
      window.location.reload()

    });
    setisSelected([]);
  };
  function calculateTotalPrice(items: any) {
    return items.reduce((total: any, item: any) => {
      return total + item.price * item.quantity;
    }, 0); // Initial total is 0
  }
  const totalPrice = calculateTotalPrice(CartItems);
  const order = CartItems.map((item: any) => {
    return {
      itemId: item.id,
      quantity: item.quantity,
    };
  });
  const router = useRouter();
  const handlePayment = async () => {
    if (order.length === 0) {
      toast.error("No items in cart");
      return;
    }
    console.log("clicked");
    const toastId = toast.loading("Initiating Payment");
    const response = await fetch("/api/initiatePayment", {
      method: "POST",
      body: JSON.stringify({ order }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status !== 200) {
      toast.error(data.error, { id: toastId });
      return;
    }
    toast.dismiss(toastId);
    var opti = {
      key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: 100 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "EliteStore", //your business name
      description: "Order Description",
      // image: imgSrc,
      order_id: data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function async(response: any) {
        // console.log("res : ", response);
        const toastId = toast.loading(
          "Payment Successful, Creating Order please wait..."
        );
        await fetch("/api/order/createOrder", {
          method: "POST",
          body: JSON.stringify({
            order,
            payment: response,
          }),
        });
        toast.success("Order Created Successfully", { id: toastId });
        router.push("/productlist"); //redirect to home page
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "name", //your customer's name
        email: "email", //your customer's email
        contact: "phone", //Provide the customer's phone number for better conversion rates
      },
      theme: {
        color: "#11074C",
      },
    };
    var rzp1: any = new window.Razorpay(opti);
    rzp1.open();
    rzp1.on("payment.failed", function (response: any) {
      console.log("payment failed : ", response);
      toast.error("Payment Failed", { id: toastId });
    });
  };
  console.log(cartItems);


  useEffect(() => {
    console.log("CartItems updated:", CartItems);
  }, [CartItems]);

  useEffect(() => {
    localStorageItems()
  }, [])

  return (
    <div className="flex w-full flex-col gap-[5.50rem] bg-white-a700 md:gap-[4.13rem] sm:gap-[2.75rem]">
      <div className="flex flex-col gap-[1.50rem]">
        {/* <Header /> */}
        <div className="flex flex-col items-center">
          {/* <div className="mx-auto flex w-full max-w-[75.25rem] flex-col gap-[2.88rem] md:px-[1.25rem]">
            <Breadcrumb>
              <BreadcrumbList className="flex flex-wrap items-center gap-[0.38rem]">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#">
                      <Text
                        size="textlg"
                        as="p"
                        className="text-[1.13rem] font-normal capitalize tracking-[0.00rem] text-gray-500"
                      >
                        Home
                      </Text>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Img
                    src="defaultNoData.png"
                    width={24}
                    height={24}
                    alt="Arrow Right"
                    className="h-[1.50rem] w-[1.50rem]"
                  />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link href="#" className="self-end">
                      <Heading
                        as="h1"
                        className="text-[1.13rem] font-semibold capitalize tracking-[0.00rem] text-blue_gray-900_01"
                      >
                        Shopping Cart
                      </Heading>
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-[1.50rem] md:flex-col">
              <div className="flex flex-1 flex-col gap-[1.38rem] md:self-stretch">
                <div className="flex flex-col gap-[1.38rem]">
                  <div className="flex justify-between gap-[1.25rem] sm:flex-col">
                    <div className="flex gap-[1.00rem]">
                      {isSelected?.length == CartItems?.length &&
                        CartItems.length > 0 ? (
                        <Img
                          src="img_checkmark_blue_gray_900_01.svg"
                          width={20}
                          height={20}
                          alt="Checkmark Image"
                          className="h-[1.25rem] w-[1.25rem] cursor-pointer"
                          onClick={() => setisSelected([])}
                        />
                      ) : (
                        <Square
                          onClick={addEveryItemToList}
                          className=" cursor-pointer"
                        />
                      )}
                      <Heading
                        as="h2"
                        className="text-[1.13rem] font-semibold text-blue_gray-900_01"
                      >
                        {isSelected?.length ?? 0} / {CartItems?.length} ITEMS
                        SELECTED
                      </Heading>
                    </div>
                    <div className="flex flex-1 justify-end sm:self-stretch">
                      <Heading
                        as="h3"
                        className="text-[1.13rem] font-semibold text-blue_gray-900_01 cursor-pointer"
                        onClick={removeItems}
                      >
                        REMOVE
                      </Heading>
                      <Separator
                        orientation="vertical"
                        className="ml-[1.00rem] h-[1.38rem] w-[0.06rem] bg-blue_gray-900_01"
                      />
                      <Heading
                        as="h4"
                        className="ml-[0.88rem] text-[1.13rem] font-semibold text-blue_gray-900_01"
                      >
                        MOVE TO WISHLIST
                      </Heading>
                    </div>
                  </div>
                  <Separator
                    orientation="horizontal"
                    className="h-[0.06rem] bg-blue_gray-100"
                  />
                </div>
                <div className="flex flex-col gap-[1.00rem]">
                  <Suspense fallback={<div>Loading feed...</div>}>
                    {
                      CartItems &&
                      CartItems.map((item) => (
                        // @ts-ignore
                        item.quantity > 0 &&
                        <ProductDetails1
                          item={item}
                          // @ts-ignore
                          id={item.id}
                          // @ts-ignore
                          productName={item.name}
                          // @ts-ignore
                          productImage={item.image}
                          // @ts-ignore
                          currentPrice={item.price?.toString()}
                          // @ts-ignore
                          quantity={item.quantity}
                          // @ts-ignore
                          isSelected={isSelected}
                          setisSelected={setisSelected}
                        />
                      ))
                    }
                  </Suspense>
                </div>
              </div>
              <div className="flex w-[42%] items-start justify-center gap-[1.38rem] md:w-full sm:flex-col">
                <Separator
                  orientation="vertical"
                  className="h-[50.63rem] w-[0.06rem] self-center bg-gray-300 sm:h-[0.06rem] sm:w-[50.63rem]"
                />
                <div className="flex flex-1 flex-col gap-[2.00rem] rounded-lg bg-white-a700 sm:self-stretch">
                  <div className="flex flex-col items-start justify-center gap-[1.38rem]">
                    <Heading
                      as="h5"
                      className="text-[1.13rem] font-semibold text-blue_gray-900_01"
                    >
                      PRICE DETAILS ( {CartItems.length} items)
                    </Heading>
                    <div className="flex flex-col gap-[0.88rem] self-stretch">
                      <div className="flex flex-wrap justify-between gap-[1.25rem]">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-normal text-gray-600"
                        >
                          Total MRP
                        </Text>
                        <Text size="textlg" as="p" className="text-[1.13rem] font-normal text-gray-950">
                          ₹{totalPrice.toFixed(2)}
                        </Text>
                      </div>
                      <div className="flex flex-wrap justify-between gap-[1.25rem]">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-normal text-gray-600"
                        >
                          Discount on MRP
                        </Text>
                        <Text size="textlg" as="p" className="text-[1.13rem] font-normal text-green-600_01">
                          -₹{(totalPrice / 10).toFixed(2)}
                        </Text>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-[1.25rem]">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-normal text-gray-600"
                        >
                          Coupon Discount
                        </Text>
                        <Text size="textlg" as="p" className="text-[1.13rem] font-normal text-green-600_01">
                          -₹{(0).toFixed(2)}
                        </Text>
                      </div>
                      <div className="flex justify-center">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[1.13rem] font-normal text-gray-600"
                        >
                          Shipping Fee
                        </Text>
                        <div className="flex flex-1 flex-wrap justify-end">
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[1.13rem] font-normal text-blue_gray-900_01 line-through"
                          >
                            ₹100
                          </Text>
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[1.13rem] font-normal text-green-600_01"
                          >
                            FREE
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Separator
                      orientation="horizontal"
                      className="h-[0.06rem] w-full self-stretch bg-gray-300"
                    />
                    <div className="flex flex-wrap justify-between gap-[1.25rem] self-stretch">
                      <Heading
                        as="h6"
                        className="text-[1.13rem] font-semibold text-blue_gray-900_01"
                      >
                        Total Amount
                      </Heading>
                      <Heading as="h6" className="text-[1.13rem] font-semibold text-blue_gray-900_01">
                        ₹{(totalPrice - (totalPrice / 10)).toFixed(2)}
                      </Heading>
                    </div>
                  </div>
                  <Button
                    shape="round"
                    onClick={handlePayment}
                    className="w-full max-w-[29.13rem] self-stretch rounded-md px-[2.13rem] font-medium sm:px-[1.25rem]"
                  >
                    PLACE ORDER
                  </Button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="h-screen w-full bg-[#000000]">
            <div className="flex justify-center text-[#ffffff] flex-wrap max-w-[800px] mx-auto gap-16 m-10">
              <div className="flex items-center justify-center">
                <div className="bg-[#ffffff] text-[#000000] p-1 px-3 mx-2 rounded-full " >1</div>
                <div>SHOPPING CART</div>
              </div>
              <div className="flex items-center justify-center text-[#a3a3a3]  ">
                <div className="bg-[#1f1f1f] text-[#ffffff] p-1 px-3 mx-2 rounded-full " >2</div>
                <div> CHECKOUT</div>
              </div>
              <div className="flex items-center justify-center text-[#a3a3a3] ">
                <div className="bg-[#1a1a1a] text-[#ffffff] p-1 px-3 mx-2 rounded-full " > 3</div>
                <div> ORDER STATUS</div>
              </div>
            </div>
            <div className="flex flex-col mt-16 text-[#ffffff] max-w-[600px] mx-auto flex-wrap justify-center text-center items-center h-[50vh] gap-3" >
              <div> <ShoppingCart size={40} /> </div>
              <div className="text-xl"> YOUR SHOPPING CART IS EMPTY </div>
              <div className="text-sm text-[#979797]"> We invite you to get acquainted with an assortment of our shop. Surely you can find something for yourself!</div>
              <div>
                <Link href={'/productlist'}>  <button className="bg-[#5FFD00] text-[#000000] px-4 py-2 rounded-lg font-semibold text-sm" > Return To Shop</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedProductsSection />
      {/* FOOTER */}
      <div className="flex">
        <div className="flex w-full justify-center bg-blue_gray-900_01 py-[2.50rem] sm:py-[1.25rem]">
          <div className="mx-auto flex w-full max-w-[75.25rem] justify-center md:px-[1.25rem]">
            <div className="flex w-full flex-col gap-[6.75rem] md:gap-[5.06rem] sm:gap-[3.38rem]">
              <div className="mr-[3.38rem] flex items-start justify-between gap-[1.25rem] md:mr-0 md:flex-col">
                <div className="flex w-[46%] flex-col gap-[2.25rem] md:w-full">
                  <Img
                    src="img_frame_637.svg"
                    width={544}
                    height={32}
                    alt="Brand Image"
                    className="h-[2.00rem]"
                  />
                  <div className="flex flex-col gap-[1.13rem]">
                    <Text
                      as="p"
                      className="text-[1.00rem] font-normal leading-[1.63rem] text-white-a700"
                    >
                      Style Flows Here: Your Ultimate Fashion Destination!
                      Explore Trendsetting Collections, Shop the Latest Looks,
                      and Let Your Fashion Flow with Us!
                    </Text>
                    <div className="flex items-center gap-[0.63rem]">
                      <Img
                        src="img_lock_white_a700.svg"
                        width={24}
                        height={24}
                        alt="Lock Icon"
                        className="h-[1.50rem] w-[1.50rem]"
                      />
                      <Text
                        as="p"
                        className="self-end text-[1.00rem] font-normal text-white-a700"
                      >
                        FashionFlow@Gmail.com
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="flex w-[42%] items-start justify-between gap-[1.25rem] self-center md:w-full sm:flex-col">
                  <div className="flex w-[42%] flex-col items-start gap-[0.88rem] sm:w-full">
                    <Heading
                      size="headingmd"
                      as="h6"
                      className="text-[1.00rem] font-bold text-white-a700"
                    >
                      Product
                    </Heading>
                    <ul className="flex flex-col items-start gap-[1.00rem]">
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Landing pages
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Shop
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Women
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Men
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Accessories
                          </Text>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="flex w-[42%] flex-col items-start gap-[0.88rem] self-center sm:w-full">
                    <Heading
                      size="headingmd"
                      as="h6"
                      className="text-[1.00rem] font-bold text-white-a700"
                    >
                      Company
                    </Heading>
                    <ul className="flex w-[68%] flex-col items-start gap-[1.00rem] md:w-full">
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            About
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Privacy Policy
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="w-full leading-[1.63rem]">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Terms & Conditions
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Partners
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Contact
                          </Text>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-start gap-[0.88rem]">
                    <Heading
                      size="headingmd"
                      as="h6"
                      className="text-[1.00rem] font-bold text-white-a700"
                    >
                      Resources
                    </Heading>
                    <ul className="flex flex-col items-start gap-[1.00rem]">
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Blog
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Tools
                          </Text>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Text
                            as="p"
                            className="text-[1.00rem] font-normal text-gray-200"
                          >
                            Support
                          </Text>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-[1.25rem]">
                <Text
                  as="p"
                  className="self-end text-[1.00rem] font-normal text-white-a700_cc"
                >
                  © 2020 All Right Reserved
                </Text>
                <div className="flex w-[10%] justify-between gap-[1.25rem]">
                  <Img
                    src="img_bx_bxl_instagram_alt.svg"
                    width={24}
                    height={24}
                    alt="Instagram Icon"
                    className="h-[1.50rem] w-[1.50rem]"
                  />
                  <Img
                    src="img_akar_icons_twitter_fill.svg"
                    width={24}
                    height={24}
                    alt="Twitter Icon"
                    className="h-[1.50rem] w-[1.50rem]"
                  />
                  <Img
                    src="img_akar_icons_linkedin_fill.svg"
                    width={24}
                    height={24}
                    alt="Linkedin Icon"
                    className="h-[1.50rem] w-[1.50rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
