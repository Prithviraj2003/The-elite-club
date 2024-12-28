"use client";

import { Img, Text, Heading, Button, Input } from "@/components/ui";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

export default function Footer({ ...props }: Props) {
  return (
    <div {...props} className={`${props.className} flex flex-col bg-[#000000]`}>
      <div className="self-stretch">
        <div className="flex justify-center bg-[#000000]">
          <div className="mx-auto flex w-full max-w-[75.25rem] justify-center md:px-[1.25rem]">
            <div className="flex w-full items-center gap-[3.13rem] md:flex-col">
              <div className="flex flex-1 flex-col items-start justify-center gap-[1.63rem] md:self-stretch ">
                <Heading size="headingxl" as="h5" className="text-[1.38rem] font-semibold text-gray-100">
                  Our Newsletter
                </Heading>
                <Heading
                  size="heading5xl"
                  as="h1"
                  className="text-[2.88rem] font-bold leading-[4.13rem] text-gray-100 md:text-[2.63rem] sm:text-[2.25rem]"
                >
                  <>
                    Subscribe to Our <br />
                    Newsletter for Updates on
                    <br />
                    Our Latest Collection
                  </>
                </Heading>
                <Text size="textlg" as="p" className="text-[1.13rem] font-medium text-gray-100">
                  Get 20% off on your first order just by subscribing to our newsletter
                </Text>
                <div className="relative h-[4.13rem] w-[78%] content-center md:h-auto">
                  <Input
                    size="lg"
                    shape="round"
                    placeholder={`Your business email`}
                    className="mx-auto flex-grow rounded-md border border-solid border-blue_gray-900_01 px-[1.13rem]"
                  />
                  <Button
                    shape="round"
                    className="absolute bottom-0 right-[0.50rem] top-0 my-auto w-full min-w-[9.38rem] max-w-[9.38rem] rounded-md px-[1.25rem] font-medium"
                  >
                    GET STARTED
                  </Button>
                </div>
              </div>
              <Img
                src="img_two_fashion_lau.png"
                width={410}
                height={508}
                alt="Fashion Image"
                className="h-[31.75rem] w-[36%] object-contain md:w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center self-stretch bg-[#000000] py-[2.50rem] sm:py-[1.25rem]">
        <div className="mx-auto flex w-auto max-w-[75.25rem] flex-col gap-[6.63rem] md:gap-[4.94rem] md:px-[1.25rem] sm:gap-[3.31rem]">
          <div className="flex items-start justify-between gap-0 sm:gap-[1.25rem] md:flex-col">
            <div className="flex w-[46%] flex-col gap-[2.25rem] md:w-full">
              <Img src="img_frame_637.svg" width={544} height={32} alt="Fashion Image" className="h-[2.00rem]" />
              <div className="flex flex-col gap-[1.13rem]">
                <Text as="p" className="text-[1.00rem] font-normal leading-[1.63rem] text-white-a700">
                  Style Flows Here: Your Ultimate Fashion Destination! Explore Trendsetting Collections, Shop the Latest
                  Looks, and Let Your Fashion Flow with Us!
                </Text>
                <div className="flex items-center gap-[0.63rem]">
                  <Img
                    src="img_lock_white_a700.svg"
                    width={24}
                    height={24}
                    alt="Email Icon"
                    className="h-[1.50rem] w-[1.50rem]"
                  />
                  <Text as="p" className="self-end text-[1.00rem] font-normal text-white-a700">
                    FashionFlow@Gmail.com
                  </Text>
                </div>
              </div>
            </div>
            <div className="mr-[3.38rem] flex w-[42%] items-start justify-between gap-[1.25rem] self-center md:mr-0 md:w-full sm:flex-col">
              <div className="flex w-[42%] flex-col items-start gap-[0.88rem] sm:w-full">
                <Heading size="headingmd" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                  Product
                </Heading>
                <ul className="flex flex-col items-start gap-[1.00rem]">
                  <li>
                    <Link href="#">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Landing pages
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="Shop" target="_blank" rel="noreferrer">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Shop
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="Women" target="_blank" rel="noreferrer">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Women
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="Men" target="_blank" rel="noreferrer">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Men
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="Accessories" target="_blank" rel="noreferrer">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Accessories
                      </Text>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex w-[42%] flex-col items-start gap-[0.88rem] self-center sm:w-full">
                <Heading size="headingmd" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                  Company
                </Heading>
                <ul className="flex w-[68%] flex-col items-start gap-[1.00rem] md:w-full">
                  <li>
                    <Link href="About" target="_blank" rel="noreferrer">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        About
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Privacy Policy
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="w-full leading-[1.63rem]">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Terms & Conditions
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="Partners" target="_blank" rel="noreferrer">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Partners
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="Contact" target="_blank" rel="noreferrer">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Contact
                      </Text>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-start gap-[0.88rem]">
                <Heading size="headingmd" as="h6" className="text-[1.00rem] font-bold text-white-a700">
                  Resources
                </Heading>
                <ul className="flex flex-col items-start gap-[1.00rem]">
                  <li>
                    <Link href="Blog" target="_blank" rel="noreferrer">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Blog
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="Tools" target="_blank" rel="noreferrer">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Tools
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="Support" target="_blank" rel="noreferrer">
                      <Text as="p" className="text-[1.00rem] font-normal text-gray-200">
                        Support
                      </Text>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex  sm:flex-col flex-row items-center justify-between gap-0 sm:gap-[1.25rem]">
            <div>
              <Text as="p" className="self-end text-[1.00rem] font-normal text-white-a700_cc">
                © 2020 All Right Reserved
              </Text>
            </div>
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
  );
}
