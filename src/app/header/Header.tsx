// @ts-ignore
import { UserCircle, ShoppingCart, Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className=' bg-[#000000] px-28 p-4 flex gap-4 justify-between text-[#ffffff]'>
            <div> <img src="/Logo.png" alt="" /> </div>
            <div className='flex gap-20'>
                <div className='flex  gap-5 text-sm'>
                    <Link href={'/productlist'}><div className='hover:text-[#5FFD00]'>Shop All</div></Link>
                    <Link href={'/about-us'}><div className='hover:text-[#5FFD00]'>About Us</div></Link>
                    <Link href={'/FAQ'}><div className='hover:text-[#5FFD00]'> FAQs</div></Link>
                </div>
                <div className='flex gap-5'>
                    <Heart size={19} />
                    <Link href={'/profile'}><UserCircle size={19} /></Link>
                    <Link href={'/shoppingcart'} ><ShoppingCart size={19} /></Link>
                </div>
            </div>
        </div>
    )
}

export default Header