import Image from 'next/image'
import React from 'react'

const ProductCardv2 = () => {
    return (
        <div className='flex flex-col max-w-[400px] p-3'>
            <Image src={'/Component.png'} height={500} width={250} alt='img' className='p-3 max-h-[350px] max-w-[350px]' />
            <div className='my-3 text-xl'> Space Walker </div>
            <div className='my-1'> ₹1490.00 </div>
            <select name="" id="" className='max-w-[300px] bg-black text-[#ffffff] my-5 hover:bg-[#5630CE] transition-all duration-200 rounded-md'>
                <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="S">S</option>
                <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="M">M</option>
                <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="L">L</option>
                <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="XL">XL</option>
            </select>
            <button className='px-5 py-2 text-sm bg-[#333333] rounded-xl text-[#bebebe]'> Select Options </button>
        </div>
    )
}

export default ProductCardv2