'use client'
import { useCart } from "@/store/store";
import Link from "next/link";
import React, { useState } from "react";
import { useStore } from "zustand";
import { Button, Heading, Img, Text } from "../ui";
import Image from "next/image";

interface Product {
  category: string,
  description: string,
  id: string,
  imageUrl: string,
  price: number,
  rating: number,
  name: string
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
  const [activeSize, setactiveSize] = useState('S')
  const isProductAdded = cartItems.filter((cart: any) => cart.image == data?.imageUrl)
  console.log(data)

  const removeFromLocalStorage = (id: string, image: string, price: Number, name: string, quantity = 1, size: string) => {
    localStorage.setItem(id, JSON.stringify({ id, image, price, name, quantity, size }))
  }

  const addToLocalStorage = (id: string, image: string, price: Number, name: string, quantity = 1, size: string) => {
    localStorage.setItem(id, JSON.stringify({ id, image, price, name, quantity, size }))
  }
  return (
    <>

      <div className='flex flex-col justify-between max-w-[400px]'>
        <Link href={`/productlist/${data.id}`}> <Image src={data?.imageUrl} height={500} width={250} alt='img' className='p-3 w-[300px] h-[350px] rounded-lg' /></Link>
        <div className='my-3 text-xl'>     {data?.name}</div>
        <div className='my-1'> ₹{data.price} </div>
        <select name="" id="" onChange={(e) => setactiveSize(e.target.value)} className='max-w-[300px] bg-black text-[#ffffff] my-5 hover:bg-[#5630CE] transition-all duration-200 rounded-md'>
          <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="S">S</option>
          <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="M">M</option>
          <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="L">L</option>
          <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="XL">XL</option>
        </select>
        {
          isProductAdded.length > 0 ?
            <div className="flex gap-4 items-center cursor-pointer">
              <button className='px-5 py-2 text-sm bg-[#333333] rounded-xl'
                onClick={() => (
                  decrementItem({
                    id: data.id,
                    image: data.imageUrl,
                    price: data.price,
                    title: data.name
                  })
                  // removeFromLocalStorage(data.id, data.imageUrl, data.price, data.name, (isProductAdded[0].quantity - 1), activeSize)
                )}
              > - </button>
              <div className="select-none"> {isProductAdded[0].quantity}</div>
              <button className='px-5 py-2 text-sm bg-[#333333] rounded-xl'
                onClick={() => (
                  incrementItem({
                    id: data.id,
                    image: data.imageUrl,
                    price: data.price,
                    title: data.name
                  })
                  // addToLocalStorage(data.id, data.imageUrl, data.price, data.name, (isProductAdded[0].quantity + 1), activeSize)
                )}
              > + </button>
            </div>
            :
            <button className='px-5 py-2 text-sm bg-[#333333] rounded-xl'
              onClick={() => (
                incrementItem({
                  id: data.id,
                  image: data.imageUrl,
                  price: data.price,
                  title: data.name
                }),
                addToLocalStorage(data.id, data.imageUrl, data.price, data.name, (isProductAdded[0].quantity + 1), activeSize)
              )}
            >
              Add to Cart
            </button>
        }

        {/* <button className='px-5 py-2 text-sm bg-[#333333] rounded-xl'> Select Options </button> */}
      </div>
    </>
  );
}
