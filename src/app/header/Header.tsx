// @ts-ignore
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
// @ts-ignore
import { Menu } from 'lucide-react'
// @ts-ignore
import { UserCircle, ShoppingCart, Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className=' bg-[#000000] md:px-10 px-28 p-4 flex gap-4 items-center justify-between text-[#ffffff]'>
            <div> <Link href={'/'}><img src="/Logo.png" alt="" /></Link> </div>
            <div className='hidden md:block'>
                <Sheet >
                    <SheetTrigger> <Menu /> </SheetTrigger>
                    <SheetContent className='bg-[#000000] text-[#ffffff] w-[30vw]'>
                        <div className='flex gap-9  flex-col'>
                            <div className='flex  flex-col gap-5 text-sm'>
                                <Link href={'/productlist'}><div className='hover:text-[#5FFD00]'>Shop All</div></Link>
                                <Link href={'/about-us'}><div className='hover:text-[#5FFD00]'>About Us</div></Link>
                                <Link href={'/FAQ'}><div className='hover:text-[#5FFD00]'> FAQs</div></Link>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <Heart size={19} />
                                <Link href={'/profile'}><UserCircle size={19} /></Link>
                                <Link href={'/shoppingcart'} ><ShoppingCart size={19} /></Link>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <div className='flex gap-20 md:hidden items-center'>
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