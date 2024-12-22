import { Text, Heading, Img, Button } from "@/components/ui";
import { useCart } from "@/store/store";
import Link from "next/link";
import React from "react";
import { useStore } from "zustand";

interface Product {
  category: string,
  description: string,
  id: number,
  imageUrl: string,
  price: number,
  rating: number,
  title: string
}
interface Props {
  className?: string;
}

interface CartState {
  cartItems: any;
  incrementItem: any;
  decrementItem: any;
  removeItem: any;
}

export default function ProductListProductcard({ data, cartItem }: { data: Product, cartItem: any }) {
  const { cartItems, incrementItem, decrementItem } = useCart();
  // console.log(, "this is cart item")
  const isProductAdded = cartItems.filter((cart: any) => cart.image == data?.imageUrl)

  return (
    <div className={` flex flex-col justify-between items-center w-full `}>
      <div className="relative min-h-[21.25rem] content-center self-stretch">
        <img
          src={data?.imageUrl}
          width={272}
          height={340}
          alt="Urban Vibe Image"
          className="mx-auto h-[21.25rem] w-full flex-1 object-cover"
        />
        <Button
          size="sm"
          shape="square"
          className="absolute left-[0.56rem] top-[0.63rem] m-auto w-full min-w-[4.88rem] bg-red-700 rounded-2xl text-white-a700 max-w-[4.88rem] px-[0.75rem] font-bold"
        >
          25% OFF
        </Button>
      </div>
      <div className="flex flex-col items-start justify-center gap-[0.38rem] self-stretch p-2">
        <div className="flex ">
          <Heading as="h6" className="text-[0.9rem] font-semibold text-blue_gray-900_01">
            {data?.title}
          </Heading>
        </div>
        <div className="flex self-stretch">
          <Heading size="headings" as="p" className="text-[0.88rem] font-semibold text-gray-400">
            H&M
          </Heading>
          <div className="flex flex-1 px-[1.00rem]">
            <Img
              src="img_frame_amber_500.svg"
              width={16}
              height={16}
              alt="Rating Image"
              className="h-[1.00rem] w-[1.00rem]"
            />
            <Heading size="headings" as="p" className="text-[0.88rem] font-semibold text-blue_gray-900_01">
              {data.rating?.toString()}
            </Heading>
          </div>
        </div>
        <div className="flex  gap-[0.56rem] self-stretch items-center">
          <Heading as="h6" className="flex text-[1.13rem] font-bold text-blue_gray-900_01">
            Rs. {(data.price * 84).toFixed(0)}
          </Heading>
          <Text size="textlg" as="p" className="text-[0.93rem] font-normal text-gray-400 line-through ">
            Rs {(data.price * 84 + 200).toFixed(0)}
          </Text>
        </div>
        {
          isProductAdded.length > 0 ?
            <div className="flex gap-4 items-center cursor-pointer">
              <div className="border border-blue-700 px-2 select-none rounded-sm"
                onClick={() => (
                  decrementItem({
                    id: data.id,
                    image: data.imageUrl,
                    price: data.price,
                    title: data.title
                  })
                )}
              > - </div>
              <div className="select-none"> {isProductAdded[0].quantity}</div>
              <div className="border border-blue-700 px-2 select-none rounded-sm"
                onClick={() => (
                  incrementItem({
                    id: data.id,
                    image: data.imageUrl,
                    price: data.price,
                    title: data.title
                  })
                )}
              > + </div>
            </div>
            :
            <div className="border select-none border-primary font-semibold rounded-md px-2 my-1 text-base cursor-pointer hover:bg-blue_gray-900_01 hover:text-[#ffff] active:bg-transparent active:text-blue_gray-900_01 active:scale-95"
              onClick={() => (
                incrementItem({
                  id: data.id,
                  image: data.imageUrl,
                  price: data.price,
                  title: data.title
                })
              )}
            >
              Add to Cart
            </div>
        }

      </div>
    </div>
  );
}
