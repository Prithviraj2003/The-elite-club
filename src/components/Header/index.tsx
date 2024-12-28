'use client'
import { Img, Heading, Menubar, MenubarContent, MenubarMenu, MenubarTrigger, Text } from "@/components/ui";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";

interface Props {
  className?: string;
}

export default function Header({ ...props }: Props) {
  return (
    <div {...props} className="bg-[#000000]">
      <div className="flex justify-center self-stretch bg-blue_gray-900_01 py-[0.88rem] ">
        <div className="mx-auto flex w-full max-w-[75.25rem] items-center justify-between gap-[1.25rem] md:flex-col md:px-[1.25rem] ">
          <Text as="p" className="self-end text-[1.00rem] font-normal text-white-a700 md:self-auto">
            <span className="text-white-a700">
              Sign up now and enjoy a 25% discount on your first order. Don&#39;t miss out!&nbsp;
            </span>
            <span className="font-semibold text-blue-700">Sign up now</span>
          </Text>
          <Link href="#">
            <Img
              src="img_icon.svg"
              width={24}
              height={24}
              alt="Promo Icon"
              className="h-[1.50rem] w-[1.50rem] md:w-full"
            />
          </Link>
        </div>
      </div>
      <div className="flex justify-center self-stretch border-b border-solid border-gray-600  py-[1.50rem] sm:py-[1.25rem] bg-[#000000]">
        <div className="mx-auto flex w-full max-w-[75.25rem] items-center justify-between gap-[1.25rem] md:flex-col md:px-[1.25rem] ">
          <Link href={'/'}>  <Img
            src="img_header_logo.svg"
            width={126}
            height={32}
            alt="Header Logo"
            className="h-[2.00rem] w-[7.88rem] object-contain"
          /></Link>
          <Menubar className="flex flex-wrap gap-[1.25rem] border-none bg-[#000000]">
            <MenubarMenu>
              <MenubarTrigger>
                <Heading size="headings" as="p" className="text-[0.88rem] font-semibold ">
                  <Link className="text-[#5FFD00]" href={'/productlist'}> Home</Link>
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu >
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-[#5FFD00]"
                >
                  Shop
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-[#5FFD00]"
                >
                  Women
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-[#5FFD00]"
                >
                  Men
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-[#5FFD00]"
                >
                  Accessories
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Link href={'/about-us'}>
                  <Heading
                    size="headings"
                    as="p"
                    className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-[#5FFD00]"
                  >
                    About Us
                  </Heading>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Link href={'/contact-us'}>
                  <Heading
                    size="headings"
                    as="p"
                    className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-[#5FFD00]"
                  >
                    Contact Us
                  </Heading>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Heading
                  size="headings"
                  as="p"
                  className="cursor-pointer text-[0.88rem] font-semibold text-gray-600 hover:text-[#5FFD00]"
                >
                  Blog
                </Heading>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
          <div className="flex gap-[1.25rem]">
            <Link href="#">
              <Img src="img_search.svg" width={24} height={24} alt="Search Icon" className="h-[1.50rem] w-[1.50rem]" />
            </Link>
            <Link href="#">
              <Img
                src="img_favorite.svg"
                width={24}
                height={24}
                alt="Favorite Icon"
                className="h-[1.50rem] w-[1.50rem]"
              />
            </Link>
            <Link href='/shoppingcart'>
              <Img src="img_bag.svg"
                width={24} height={24} alt="Bag Icon"
                className="h-[1.50rem] w-[1.50rem]"
              />
            </Link>
            <Link href="#">
              <Img src="img_lock.svg" width={24} height={24} alt="Lock Icon" className="h-[1.50rem] w-[1.50rem]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
