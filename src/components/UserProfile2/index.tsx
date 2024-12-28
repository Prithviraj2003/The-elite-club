import { Text, Heading, Separator, Img } from "@/components/ui";
import React from "react";

interface Props {
  className?: string;
  userImage?: string;
  dateText?: React.ReactNode;
  brandName?: React.ReactNode;
  titleText?: React.ReactNode;
  descriptionText?: React.ReactNode;
}

export default function UserProfile2({
  userImage = "img_rectangle_142_306x380.png",
  dateText = "July 23, 2023",
  brandName = "H&M",
  titleText = "Trendy fashion",
  descriptionText = "Trendy fashion represents the latest, most popular styles and trends, constantly evolving to reflect current tastes and preferences.",
  ...props
}: Props) {
  return (
    <div {...props} className={`${props.className} flex flex-col items-center w-[23.75rem] gap-[1.75rem]`}>
      <Img
        src={userImage}
        width={380}
        height={306}
        alt="Promo Image"
        className="h-[19.13rem] w-full rounded-md object-cover"
      />
      <div className="flex flex-col gap-[0.63rem] self-stretch">
        <div className="flex items-center">
          <Text as="p" className="text-[1.00rem] font-normal text-gray-100">
            {dateText}
          </Text>
          <Separator
            orientation="vertical"
            className="ml-[1.00rem] h-[1.00rem] w-[0.06rem] self-start bg-blue_gray-700"
          />
          <Text as="p" className="ml-[0.88rem] text-[1.00rem] font-normal text-gray-100">
            {brandName}
          </Text>
        </div>
        <div className="flex flex-col items-start justify-center gap-[0.88rem]">
          <Heading as="h6" className="text-[1.13rem] font-semibold text-gray-100">
            {titleText}
          </Heading>
          <Text size="textlg" as="p" className="w-full text-[1.13rem] font-normal leading-[1.75rem] text-gray-100">
            {descriptionText}
          </Text>
        </div>
      </div>
    </div>
  );
}
