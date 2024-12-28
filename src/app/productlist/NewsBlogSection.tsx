import UserProfile2 from "../../components/UserProfile2";
import { Heading } from "@/components/ui";
import React, { Suspense } from "react";

const blogList = [
  {
    userImage: "img_rectangle_142_306x380.png",
    dateText: "July 23, 2023",
    brandName: "H&M",
    titleText: "Trendy fashion",
    descriptionText:
      "Trendy fashion represents the latest, most popular styles and trends, constantly evolving to reflect current tastes and preferences.",
  },
  {
    userImage: "img_rectangle_142_1.png",
    dateText: "July 23, 2023",
    brandName: "H&M",
    titleText: "New trend fo clothing",
    descriptionText:
      "Discover the newest fashion sensations with our latest clothing collection, showcasing cutting-edge designs and captivating styles to elevate your wardrobe.",
  },
  {
    userImage: "img_rectangle_142_2.png",
    dateText: "July 23, 2023",
    brandName: "Roster",
    titleText: "High selling product",
    descriptionText:
      "Discover our top-selling product, delivering unmatched quality and style. Renowned for its innovation and durability, it&#39;s a must-have for every discerning shopper.",
  },
];

export default function NewsBlogSection() {
  return (
    <>
      <div className="flex flex-col items-center bg-[#000000] ">
        <div className="mx-auto flex w-full max-w-[75.25rem] flex-col gap-[3.00rem] md:px-[1.25rem] ">
          <div className="flex flex-col items-center justify-center gap-[1.00rem] self-center">
            <Heading as="h2" className="text-[1.13rem] font-semibold text-gray-100">
              News & Blog
            </Heading>
            <Heading
              size="heading4xl"
              as="h3"
              className="text-[1.88rem] font-semibold text-gray-100 md:text-[1.75rem] sm:text-[1.63rem]"
            >
              Our Latest News & Blogs
            </Heading>
          </div>
          <div className="flex gap-[1.88rem] overflow-x-hidden md:flex-col">
            <Suspense fallback={<div>Loading feed...</div>}>
              {blogList.map((d, index) => (
                <UserProfile2 {...d} key={"blogList1" + index} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
