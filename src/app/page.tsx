import Image from 'next/image'
import React from 'react'
import Header from './header/Header'
// @ts-ignore
import { InstagramIcon } from 'lucide-react'
import Footer from './footer/Footer'

const page = () => {
    return (
        <>
            <Header />
            <div className='h-full  bg-[#000000] '>
                <div className='max-w-[1400px] bg-[#000000]  mx-auto'>
                    <div className='md:min-h-[500px] h-screen max-h-[600px] w-full mx-0'>
                        <img
                            src={'/homepageImg.png'}
                            className='w-full h-full m-0 p-0 object-contain'
                            alt='img' />
                    </div>
                    {/* 2 */}
                    <div className=' flex flex-col justify-center mx-auto w-full items-center bg-[#000000] text-[#ffffff] p-6 border-b border-[#3a3a3a]'>
                        <div className='text-3xl pt-36'>DRIPPIN' HOT</div>
                        <div className='text-xl m-2 mb-10'>Latest Drips For The Limitless</div>
                        <div className='flex flex-wrap w-full gap-5 mx-auto justify-center items-center'>
                            {Array(4).fill(null).map((component, index) => (
                                <div className='flex flex-col max-w-[400px]'>
                                    <Image src={'/Component.png'} height={500} width={250} alt='img' className='p-3' />
                                    <div className='my-3 text-xl'> Space Walker </div>
                                    <div className='my-1'> ₹1490.00 </div>
                                    <select name="" id="" className='max-w-[300px] bg-black text-[#ffffff] my-5 hover:bg-[#5630CE] transition-all duration-200 rounded-md'>
                                        <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="S">S</option>
                                        <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="M">M</option>
                                        <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="L">L</option>
                                        <option className='bg-[#272727] hover:bg-[#5630CE] text-[#dadada] text-center' value="XL">XL</option>
                                    </select>
                                    <button className='px-5 py-2 text-sm bg-[#333333] rounded-xl'> Select Options </button>
                                </div>))}
                        </div>
                    </div>
                    {/* 3 */}
                    <div className='  md:h-[auto] md:max-h-[2200px] max-h-[900px] bg-[#000000] text-[#ffffff] flex flex-col justify-center '>
                        <div className='flex justify-center md:text-center text-2xl p-2 pl-0'>
                            AS SEEN ON
                        </div>
                        <div className='flex flex-wrap md:gap-6 gap-3 justify-center'>
                            {Array(4).fill(null).map(() => (
                                <div className='flex flex-col max-w-[250px]'>
                                    <div> <img src="/AsSeenOn.png" className='w-full' alt="" /></div>
                                    <div className='bg-[#353535] px-3 py-2 rounded-b-lg text-[#ffffff] text-sm flex justify-between'>
                                        <div>the musicmonk </div>
                                        <div><InstagramIcon color="green" size={19} /> </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* 4 */}
                    <div className=' h-auto max-h-[1500px] bg-[#000000] text-[#ffffff] flex flex-col justify-center '>
                        <div className='flex justify-around w-full  text-base md:text-[0.600rem] border-y border-green-500 p-1 mt-60'>
                            <div>MADE FOR THE CREATORS</div>
                            <div> MADE FOR THE DREAMERS</div>
                            <div> MADE FOR THE DOERS</div>
                            <div>MADE FOR THE LIMITLESS</div>
                            <div>MADE FOR THE HUSTLERS</div>
                        </div>
                        <div className='md:w-[90%] w-[500px] bg-[#5630CE] h-[600px] mx-auto my-7 mt-20 rounded-xl flex flex-col py-12 items-center '>
                            <div className='text-center   text-lg'> FOLLOW US ON</div>
                            <div className='text-center mb-4  text-lg'>INSTAGRAM</div>
                            <div className='grid grid-cols-3 mx-auto gap-4'>
                                {Array(9).fill(null).map(() => (
                                    <img className='w-[140px] h-[120px]' src="/Instagram.png" alt="" />
                                ))}
                            </div>
                            <div className='m-5 p-3 px-5 border rounded-lg tracking-widest'>FOLLOW </div>
                        </div>
                        <div><img src="/Section.png" alt="" className='w-auto' /> </div>
                    </div>
                    {/* 5 */}
                    <div className='md:h-auto max-h-[700px] flex md:flex-col flex=row text-[#ffffff] md:px-0 px-20 md:mt-10 mt-20 '>
                        <div className='md:w-full w-[50%] flex flex-col md:p-3 p-5 '>
                            <div className='text-base'>JOIN THE</div>
                            <div className='text-3xl'>LIMITLESS CLUB</div>
                            <div className='text-[#8f8f8f] p-3 text-sm pl-0'>
                                Join our exclusive community to get access to our latest drops, community events,
                                and members-only collection.</div>
                            <div className='flex gap-2'>
                                <input type="text" className='w-[200px] bg-[#ffffff] rounded-md ' />
                                <button className='bg-[#5FFD00] px-4 py-2 text-[#000000] rounded-lg font-semibold text-sm'>LESSSGOO!</button>
                            </div>
                            <div className='text-[#5FFD00] text-sm py-2'>Don't worry, we will not spam you.</div>
                        </div>
                        <div className='md:w-full w-[50%]'>
                            <img src="/Component13.png" alt="" className='p-4' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page