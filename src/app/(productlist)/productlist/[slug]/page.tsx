'use client'
import axios from 'axios'
// @ts-ignore
import { ShoppingCartIcon } from 'lucide-react'
// @ts-ignore
import { Heart } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


interface DataType {
    category: string,
    description: string
    id: number
    imageUrl: string
    price: number
    name: string

}

const relatedProducts = [
    {
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.30,
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.30,
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
]

const page = ({ params }: { params: { slug: string } }) => {
    const id = params.slug
    const [Data, setData] = useState<DataType | null>(null)

    const fetchProducts = async () => {
        const { data } = await axios.get(`/api/products/${id}`)
        setData(data)
    }
    const boxSizes = ["S", "M", "L", "XL", "XXL"]
    useEffect(() => {
        fetchProducts()
    }, [])
    console.log(Data)
    return (
        <div className='h-full w-full bg-[#000000] '>
            <div className='h-screen max-h-[700px] w-full bg-[#000000] flex justify-center gap-0'>
                {/* <div className='pl-20 pt-10'> <Link href={'/productlist'} ><ArrowLeft /></Link> </div> */}
                <div className='w-[400px] flex justify-center '>
                    <img src={Data?.imageUrl} alt="" className='max-h-[400px] min-w-40 mt-2 bg-[#000000]' />
                </div>
                <div className='w-[50%] max-w-[550px]  text-[#ffffff] p-5'>
                    <div className='text-2xl'> {Data?.name} </div>
                    <div className='py-3 text-lg tracking-wider' > ₹{Data?.price.toFixed(2).toString()} </div>
                    <div className='py-5 leading-6 text-base' >{Data?.description}</div>
                    <div className='text-sm py-4 pb-2'> Select size: S </div>
                    <div className='flex my-4 mt-0 gap-0'>
                        <div className='flex items-center gap-1 flex-wrap w-[160px]'>
                            {boxSizes.map((size) => (
                                <div className='bg-[#ffffff] rounded-md text-[#000000] text-sm min-w-[35px] min-h-[35px] text-center flex items-center justify-center'>
                                    {size}
                                </div>
                            ))}
                        </div>
                        <div className='text-[#5FFD00] text-sm pt-5 pl-0'> Clear</div>
                    </div>
                    <div className='flex'>
                        <div className='w-[22%] flex gap-0 justify-evenly'>
                            <div className='p-[0.35rem] cursor-pointer border border-slate-700 border-opacity-40'>-</div>
                            <div className='p-[0.35rem] border border-slate-700 border-opacity-40'>0</div>
                            <div className='p-[0.35rem] cursor-pointer border border-slate-700 border-opacity-40'>+</div>
                        </div>
                        <div className='w-full bg-[#ffffff] rounded-xl text-[#000000] flex justify-center py-[0.05rem] items-center gap-2 cursor-pointer' >
                            <ShoppingCartIcon size={18} />  <div className='tracking-tight text-sm'> Add To Cart</div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 mt-10 mb-5'>
                        <div className='flex items-center text-sm gap-1'> <Heart size={17} /> Add to Favourites </div>
                        <div className='bg-[#5FFD00] px-6 py-2 text-sm rounded-2xl  text-[#000000] font-semibold '> Share </div>
                    </div>
                    <div>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger >Specifications</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Service Policy</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Size Chart</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                    </div>
                </div>
            </div >
            {/* Related Products */}
            <div className='  h-[900px] max-h-[1100px] bg-black flex items-center justify-center bg-[#000000] p-10'>
                <div className='flex flex-col border-y border-gray-700 py-5 border-opacity-[60%] '>
                    <div className='text-[#ffffff] text-center tracking-tight text-xl m-5'> RELATED PRODUCTS </div>
                    <div className='flex gap-2'>
                        {relatedProducts.map((product) => (
                            <div className='flex flex-col text-[#ffffff] justify-center items-center'>
                                <div>
                                    <img src={product.image} alt="" className='max-h-[400px] min-w-40 mt-2 bg-[#000000] rounded-md' />
                                </div>
                                <div className='m-3 text-lg '>{product.title} </div>
                                <div className='text-base p-2' >₹{product.price.toFixed().toString()} </div>
                                <select name="" id="" className='w-full' >
                                    {product.sizes.map((size) => (
                                        <option value="" className='bg-[#000000] outline-none w-full'> {size} </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default page