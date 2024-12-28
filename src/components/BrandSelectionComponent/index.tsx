import { Text, Checkbox, Img, Heading } from "@/components/ui";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  brandTitle?: React.ReactNode;
  seeAllLink?: React.ReactNode;
}

export default function BrandSelectionComponent({ brandTitle = "Brands", seeAllLink = "See all", ...props }: Props) {
  return (
    <div {...props} className={`${props.className} flex flex-col items-center gap-[0.63rem] flex-1`}>
      <div className="flex items-start justify-between gap-[1.25rem] self-stretch border-t border-solid border-gray-300_01 py-[0.63rem]">
        <Heading size="headingmd" as="h6" className="text-[1.00rem] font-semibold text-gray-100">
          {brandTitle}
        </Heading>
        <Img
          src="img_arrow_up_blue_gray_300.svg"
          width={24}
          height={24}
          alt="Brands Arrow"
          className="h-[1.50rem] w-[1.50rem] self-center"
        />
      </div>
      <div className="mb-[0.25rem] flex flex-col items-start gap-[1.13rem] self-stretch">
        <Checkbox
          label="Zara"
          id="48_6743_118_592_70_20"
          className="gap-[1.00rem] text-[1.00rem] text-gray-100"
        />
        <Checkbox
          label="Jockey"
          id="48_6743_118_631_90_20"
          className="gap-[1.00rem] text-[1.00rem] text-gray-100"
        />
        <Checkbox
          label="H&M"
          id="48_6743_118_668_70_20"
          className="gap-[1.00rem] text-[1.00rem] text-gray-100"
        />
        <Checkbox
          label="Calvin Khan"
          id="48_6743_118_706_126_20"
          className="gap-[1.00rem] text-[1.00rem] text-gray-100"
        />
        <Checkbox
          label="Roster"
          id="48_6743_118_744_86_20"
          className="gap-[1.00rem] text-[1.00rem] text-gray-100"
        />
        <Link href="#">
          <Text as="p" className="text-[1.00rem] font-normal text-gray-100 underline">
            {seeAllLink}
          </Text>
        </Link>
      </div>
    </div>
  );
}
