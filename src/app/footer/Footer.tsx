import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='bg-[#000000] py-8 flex flex-col text-[#ffffff] justify-center items-center gap-6'>
            <div> <img src="/Logo.png" alt="" /></div>
            <div className='flex gap-4 text-sm text-[#a7a7a7]'>
                <Link href={'/productlist'}>
                    <div className='hover:text-[#5FFD00]'>SHOP ALL</div>
                </Link>
                <Link href={'/about-us'}>
                    <div className='hover:text-[#5FFD00]'>ABOUT US</div>
                </Link>
                <div>BLOGS</div>
                <Link href={'/FAQ'}>
                    <div className='hover:text-[#5FFD00]'>FAQS</div>
                </Link>
                <Link href={'/contact-us'}>
                    <div className='hover:text-[#5FFD00]'>CONTACT US</div>
                </Link>
                <div>TRACK ORDER</div>
                <Link href={'/terms-conditions'}  >
                    <div className='hover:text-[#5FFD00]'>TERMS & CONDITIONS</div>
                </Link>
                <div>PRIVACY POLICY</div>
                <div> SHIPPING& RETURNS </div>
            </div>
            <div className='text-sm text-[#a7a7a7] mt-3'>
                © 2024 Thnklimitless Apparels Private Limited. All rights reserved.
            </div>
        </div>
    )
}

export default Footer