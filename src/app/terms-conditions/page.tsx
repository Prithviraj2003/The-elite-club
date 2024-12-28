import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { termsConditionsData } from './data'

const page = () => {
    return (
        <>
            <Header />
            <div className='bg-[#000000] sm:h-auto min-h-screen flex flex-wrap text-[#ffffff] '>
                <div className='flex flex-col sm:w-full w-[80%] mx-auto w-[90vw]'>
                    <div className='text-3xl uppercase p-4 w-[90%]'> {termsConditionsData.title} </div>
                    <div className='p-3 px-4 text-sm'>{termsConditionsData.introduction}</div>
                    <div className='p-2 px-4 '>{termsConditionsData.para.map((data) => (
                        <p className='m-4 text-sm'> {data} </p>
                    ))}</div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page