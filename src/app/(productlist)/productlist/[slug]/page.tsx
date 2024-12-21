'use client'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


interface DataType {
    category: string,
    description: string
    id: number
    image: string
    price: number
    rating: {
        rate: number,
        count: number
    },
    title: string

}

const page = ({ params }: { params: { slug: string } }) => {
    const id = params.slug
    const [Data, setData] = useState<DataType | null>(null)

    const fetchProducts = async () => {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`)
        setData(data)
    }
    console.log(Data)
    useEffect(() => {
        fetchProducts()
    }, [])

    console.log(Data)

    return (
        <div>
            <div className='pl-20 pt-10'> <Link href={'/productlist'} ><ArrowLeft /></Link> </div>
            <div className='flex items-center justify-center h-screen w-screen'>
                <div className='w-[50%] flex justify-center m-auto'>
                    <img src={Data?.image} alt="" className='min-h-40 max-h-[300px] min-w-40' />
                </div>
                <div className='w-[50%]'>
                    <div className='text-xl'> {Data?.title} </div>
                    <div>{Data?.description}</div>
                    <div> ₹{Data?.price.toString()} </div>
                    <div> ₹{Data?.rating.count.toString()} </div>
                </div>
            </div>
        </div >
    )
}

export default page