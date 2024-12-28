import ProductCardv2 from "@/components/ProductCardv2";
import HomepageProductcard from "../../components/HomepageProductcard";
import { Heading } from "@/components/ui";
import React, { Suspense } from "react";

export default function RelatedProductsSection() {
  return (
    <>
      <div className="flex flex-col items-center bg-[#000000]">
        <div className="mx-auto flex w-full max-w-[75.25rem] flex-col gap-[3.00rem] md:px-[1.25rem]">
          <div className="flex flex-col items-start justify-center gap-[0.88rem]">
            <Heading as="h2" className="text-[1.13rem] font-semibold ">
              <span className="text-[#5FFD00]">Related Product</span>
            </Heading>
            <Heading
              size="heading4xl"
              as="h3"
              className="text-[1.88rem] font-semibold text-[#5FFD00] md:text-[1.75rem] sm:text-[1.63rem]"
            >
              <span className="text-[#5FFD00]">Discover Related Products</span>
            </Heading>
          </div>
          <div className="flex justify-center items-center gap-[3.00rem] overflow-x-hidden md:flex-col">
            <Suspense fallback={<div>Loading feed...</div>}>
              {[...Array(3)].map((d, index) => (
                <ProductCardv2 key={"productList" + index} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
