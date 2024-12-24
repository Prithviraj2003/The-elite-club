import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
// @ts-ignore
import { ShoppingBag, Globe, User2, Heart, LogOut } from 'lucide-react'

const page = () => {
    return (
        <>
            <Header />
            <div className='h-[100vh] bg-[#000000] flex max-w-[1500px] text-[#ffffff]'>
                <div className='flex flex-col gap-4 border-r border-[#8f8f8f] p-4' >
                    <div className='w-[40vw] max-w-[300px] flex flex-col gap-2 '>
                        <div><img src="profilePFP.png" alt="" /></div>
                        <div className='text-sm'>Arav Kavan</div>
                        <div className='text-sm'>ararvkavan@gmail.com</div>
                    </div>
                    <div className='text-[#5FFD00] flex gap-1 text-sm'> <ShoppingBag size={19} /> Orders</div>
                    <div className='text-[#5FFD00] flex gap-1 text-sm'> <Globe size={19} /> Addresses</div>
                    <div className='text-[#5FFD00] flex gap-1 text-sm'> <User2 size={19} />  Account Details</div>
                    <div className='text-[#5FFD00] flex gap-1 text-sm'> <Heart size={19} /> Wishlist</div>
                    <div className='text-[#5FFD00] flex gap-1 text-sm'> <LogOut size={19} /> Log Out</div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page