'use client'
import axios from 'axios'
// @ts-ignore
import { ShoppingCartIcon } from 'lucide-react'
// @ts-ignore
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Footer from '@/components/Footer'
import Header from '@/app/header/Header'
import { useCart } from '@/store/store'


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
    const [itemQuantity, setitemQuantity] = useState(0)
    const [activeSize, setactiveSize] = useState('S')
    const { cartItems, incrementItem, decrementItem } = useCart();
    const fetchProducts = async () => {
        const { data } = await axios.get(`/api/products/${id}`)
        setData(data)
        localStorageItems(data?.id)
    }
    const localStorageItems = (id: string) => {
        const items: string[] = [];

        Object.keys(localStorage).forEach((k) => {
            if (k.length === 24) {
                const item = localStorage.getItem(k);
                if (item !== null) {
                    const ITEM = JSON.parse(item)
                    if (ITEM.id! == id) {
                        setitemQuantity(ITEM.quantity)
                    }
                    items.push(JSON.parse(item));
                }
            }
        });
    }
    const boxSizes = ["S", "M", "L", "XL", "XXL"]

    const removeFromLocalStorage = (id: string, image: string, price: Number, name: string, quantity = 1) => {
        localStorage.setItem(id, JSON.stringify({ id, image, price, name, quantity }))
    }

    const addToLocalStorage = (id: string, image: string, price: Number, name: string, quantity = 1, size: string) => {
        localStorage.setItem(id, JSON.stringify({ id, image, price, name, quantity, size }))
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    // useEffect(() => {
    //     localStorageItems(Data?.id)
    // }, [addToLocalStorage, removeFromLocalStorage])
    return (
        <>
            <Header />
            <div className='h-full w-full bg-[#000000] '>
                <div className=' md:h-auto h-screen  w-full bg-[#000000] flex md:flex-col flex-row md:items-center justify-center gap-0'>
                    <div className='w-auto md:w-[400px] flex justify-center '>
                        <img src={Data?.imageUrl} alt="" className='max-h-[400px] mt-2 bg-[#000000]' />
                    </div>
                    <div className='md:w-full w-[50%] max-w-[550px]  text-[#ffffff]  p-5'>
                        <div className='text-2xl'> {Data?.name} </div>
                        <div className='py-3 text-lg tracking-wider' > ₹{Data?.price.toFixed(2).toString()} </div>
                        <div className='py-5 leading-6 text-base' >{Data?.description}</div>
                        <div className='text-sm py-4 pb-2'> Select size: S </div>
                        <div className='flex my-4 mt-0 gap-3'>
                            <div className='flex items-center gap-1 flex-wrap w-auto md:w-[160px]'>
                                {boxSizes.map((size) => (
                                    <div onClick={() => setactiveSize(size)}
                                        className={`${activeSize == size ? "bg-[#5630CE] text-[#ffffff]" : "bg-[#ffffff] text-[#000000]"}  rounded-md  text-sm min-w-[35px] min-h-[35px] text-center flex items-center justify-center`}>
                                        {size}
                                    </div>
                                ))}
                            </div>
                            <div className='text-[#5FFD00] text-sm pt-5 pl-0'> Clear</div>
                        </div>
                        <div className='flex'>
                            <div className='w-[22%] flex gap-0 justify-evenly'>
                                <div
                                    onClick={() => setitemQuantity((q) => q - 1)}
                                    className='p-[0.35rem] cursor-pointer border border-slate-700 border-opacity-40'>-</div>
                                <div className='p-[0.35rem] border border-slate-700 border-opacity-40'>{itemQuantity}</div>
                                <div onClick={() => setitemQuantity((q) => q + 1)} className='p-[0.35rem] cursor-pointer border border-slate-700 border-opacity-40'>+</div>
                            </div>
                            <div
                                // @ts-ignore
                                onClick={() => addToLocalStorage(Data?.id, Data?.imageUrl, Data?.price, Data?.name, itemQuantity, activeSize)}
                                className='w-full bg-[#ffffff] rounded-xl text-[#000000] flex justify-center py-[0.05rem] items-center gap-2 cursor-pointer' >
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
                <div className=' h-auto mt-20 md:max-h-[1400px] bg-black flex  items-center justify-center bg-[#000000] p-10'>
                    <div className='flex flex-col border-y border-gray-700 py-5 border-opacity-[60%] '>
                        <div className='text-[#ffffff] text-center tracking-tight text-xl m-5'> RELATED PRODUCTS </div>
                        <div className='flex flex-wrap justify-center gap-2'>
                            {relatedProducts.map((product) => (
                                <div className='flex flex-col text-[#ffffff] justify-center items-center'>
                                    <div>
                                        <img src={product.image} alt="" className='max-h-[400px] min-w-40 mt-2 bg-[#000000] rounded-md' />
                                    </div>
                                    <div className='m-3 text-lg '>{product.title} </div>
                                    <div className='text-base p-2' >₹{product.price.toFixed().toString()} </div>
                                    <select name="" id="" className='w-full hover:bg-[#5630CE] rounded-lg transition-all duration-200' >
                                        {product.sizes.map((size) => (
                                            <option value="" className='bg-[#000000] outline-none w-full'> {size} </option>
                                        ))}
                                    </select>
                                    <div>
                                        <button className='bg-[#262626] text-sm px-7 py-2 rounded-xl' >Select Options</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default page