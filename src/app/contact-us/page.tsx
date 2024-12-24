import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'

const page = () => {
    return (
        <>
            <Header />
            <div className=' bg-[#000000] h-screen w-full flex items-center justify-start'>
                <div className='max-w-[900px] ml-28  md:ml-0'>
                    <div className='text-4xl text-[#ffffff] font-semibold my-3'> GET IN TOUCH </div>
                    <div className='text-[#a8a8a8] max-w-[400px] my-6 mt-2'>
                        If you have any questions a please fill out the form and our team will get
                        back to you within 24 hours.
                    </div>
                    <div className=''>
                        <input type="text" className='bg-[#ffffff] m-1 md:w-auto max-w-[550px]' placeholder='Your Full Name' />
                    </div>
                    <div className=''>
                        <input type="text" className='bg-[#ffffff] m-1 md:w-auto max-w-[550px]' placeholder='Your Email ID' />
                    </div>
                    <div className=''>
                        <input type="text" className='bg-[#ffffff] m-1 md:w-auto max-w-[550px]' placeholder='Subject' />
                    </div>
                    <div className=' ml-1 my-3'>
                        <textarea name="" id="" placeholder='Message' className='bg-[#ffffff] w-full resize-none ' ></textarea>
                    </div>
                    <button className='bg-[#5FFD00] text-sm p-4 px-6 rounded-md font-semibold'> SEND </button>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default page