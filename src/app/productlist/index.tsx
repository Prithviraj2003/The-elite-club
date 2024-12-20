'use client'
import BrandSelectionComponent from "../../components/BrandSelectionComponent";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductListProductcard from "../../components/Productcard";
import NewsBlogSection from "./NewsBlogSection";
import axios from "axios"
import {
  Img,
  Heading,
  Button,
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectItems,
  Text,
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
import { useStore } from "zustand";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export interface Product {
  category: string,
  description: string,
  id: string,
  imageUrl: string,
  price: number,
  rating: number,
  name: string
}

export default function ProductlistPage() {

  const [Data, setData] = useState<Product[] | null>(null)
  const Cart = useStore(useCart)
  const [price, setprice] = useState(0)
  console.log(price)
  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products/getAllProducts')
    setData(data.products)
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  console.log(Data)
  return (
    <div className="flex w-full flex-col gap-[5.63rem] bg-white-a700 md:gap-[4.19rem] sm:gap-[2.81rem]">
      <div className="flex flex-col gap-[1.50rem]">
        <Header />
        <div className="flex flex-col items-center">
          <div className="mx-auto flex w-full max-w-[75.25rem] flex-col gap-[2.88rem] md:px-[1.25rem]">
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
                        Shop
                      </Heading>
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-start gap-[3.00rem] md:flex-col">
              <div className="flex w-[20%] flex-col items-start gap-[0.75rem] md:w-full">
                <Heading as="h2" className="mt-[0.50rem] text-[1.13rem] font-bold text-blue_gray-900_01">
                  Filters
                </Heading>
                <div className="flex flex-col gap-[0.38rem] self-stretch">
                  <div className="flex flex-col gap-[0.75rem]">
                    <div className="flex items-center justify-between gap-[1.25rem] border-t border-solid border-gray-300_01 py-[0.75rem]">
                      <Heading size="headingmd" as="h3" className="text-[1.00rem] font-semibold text-gray-600">
                        Category
                      </Heading>
                      <Img
                        src="img_arrow_up_blue_gray_300.svg"
                        width={24}
                        height={24}
                        alt="Category Arrow"
                        className="h-[1.50rem] w-[1.50rem]"
                      />
                    </div>
                    <div className="mb-[0.25rem] flex flex-col items-start gap-[1.25rem]">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-800">
                        Jacket
                      </Text>
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-800">
                        T-Shirt
                      </Text>
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-800">
                        Jeans
                      </Text>
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-800">
                        Panty
                      </Text>
                      <Link href="#">
                        <Text as="p" className="text-[1.00rem] font-normal text-blue_gray-900_01 underline">
                          See all
                        </Text>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[0.38rem] md:flex-row sm:flex-col">
                    <BrandSelectionComponent />
                  </div>

                  <div className="text-#00000 font-semibold mb-3"> Price </div>
                  <div className="text-sm text-blue_gray-900_01 font-semibold">Current Value- ₹{price} </div>
                  <input type="range" value={price} max={10000} onChange={(e) => setprice(Number(e.target.value))} />
                  <div className="flex justify-between text-sm text-blue_gray-900_01 font-semibold">
                    <div>₹0</div>
                    <div>₹10,000</div>
                  </div>
                  <Select name="Condition Dropdown">
                    <SelectTrigger
                      size="md"
                      variant="outline"
                      shape="square"
                      colorScheme="undefined_undefined"
                      indicator={
                        <Img
                          src="img_arrowdown_blue_gray_300.svg"
                          width={24}
                          height={24}
                          alt="Arrow Down"
                          className="h-[1.50rem] w-[1.50rem]"
                        />
                      }
                      className="gap-[1.00rem] !border-t font-semibold"
                    >
                      <SelectValue placeholder={`Condition`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItems options={dropDownOptions} />
                    </SelectContent>
                  </Select>
                  <Select name="Ratings Dropdown">
                    <SelectTrigger
                      size="md"
                      variant="outline"
                      shape="square"
                      colorScheme="undefined_undefined"
                      indicator={
                        <Img
                          src="img_arrowdown_blue_gray_300.svg"
                          width={24}
                          height={24}
                          alt="Arrow Down"
                          className="h-[1.50rem] w-[1.50rem]"
                        />
                      }
                      className="gap-[1.00rem] !border-t font-semibold"
                    >
                      <SelectValue placeholder={`Ratings`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItems options={dropDownOptions} />
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-[3.00rem] self-center md:self-stretch">
                <div className="grid grid-cols-3 justify-center gap-[3.00rem] md:grid-cols-2 sm:grid-cols-1">
                  <Suspense fallback={<div>Loading feed...</div>}>
                    {Data?.map((d, index) => (
                      Data &&
                      <ProductListProductcard
                        cartItem={Cart}
                        key={"productListGrid" + index}
                        data={d!}
                      />
                    ))}
                  </Suspense>
                </div>
                <div className="flex items-center justify-center gap-[0.63rem]">
                  <div className="flex flex-1 items-center justify-end">
                    <Img
                      src="img_arrow_left.svg"
                      width={24}
                      height={24}
                      alt="Previous Arrow"
                      className="h-[1.50rem] w-[1.50rem]"
                    />
                    <Heading
                      size="texts"
                      as="h4"
                      className="self-start text-[0.94rem] font-medium text-blue_gray-900_01"
                    >
                      Previous
                    </Heading>
                  </div>
                  <div className="flex w-[16%] items-center justify-between gap-[1.25rem]">
                    <Button
                      size="lg"
                      className="ml-[0.63rem] w-full min-w-[2.50rem] max-w-[2.50rem] rounded-[10px] px-[1.00rem] font-medium"
                    >
                      1
                    </Button>
                    <Heading size="texts" as="h5" className="text-[0.94rem] font-medium text-blue_gray-900_01">
                      2
                    </Heading>
                    <Heading size="texts" as="h6" className="text-[0.94rem] font-medium text-blue_gray-900_01">
                      3
                    </Heading>
                    <Heading size="texts" as="p" className="text-[0.94rem] font-medium text-blue_gray-900_01">
                      4
                    </Heading>
                  </div>
                  <div className="flex items-center">
                    <Heading
                      size="texts"
                      as="p"
                      className="self-start text-[0.94rem] font-medium text-blue_gray-900_01"
                    >
                      Next
                    </Heading>
                    <Img
                      src="img_arrow_right.svg"
                      width={24}
                      height={24}
                      alt="Next Arrow"
                      className="h-[1.50rem] w-[1.50rem]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsBlogSection />
      <Footer />
    </div>
  );
}
