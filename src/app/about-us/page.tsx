import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'

const page = () => {
    return (
        <>
            <Header />
            <div className='bg-[#000000] md:h-auto h-screen w-full text-[#ffffff] text-center flex flex-col'>
                <div className='flex flex-col gap-4 text-center justify-center md:w-full w-[80%]  max-w-[850px] mx-auto border border-gray-700 border-opacity-40 p-3'>
                    <div className='text-2xl m-8'>The What. The Why. The Who.</div>
                    <div className='text-lg m-4'>Here’s Everything. Well, Maybe Not Everything, But Some Of It. </div>
                    <div className='text-sm'>
                        It starts with the word ‘Infinity’ – we think, one of the most powerful words in our vocabulary. Just the sound of that word gives you hope and courage, the thought of which
                        makes you feel that if you can just think about something, imagine it, it can be a reality, and what everything really boils down to is your mindset and the courage to
                        imagine and that is why, it’s important that we – Think Limitless.
                    </div>
                    <div className='text-sm'>
                        That’s the base of the entire thought process of this brand. That’s truly something that we believe in and trust me it’s not just blind faith, and for you to understand where
                        this faith comes from, you must know our story, the story is long so we’ll keep it short and give y’all a timeline.
                    </div>
                </div>
                <div className='flex flex-col gap-2 mt-12  w-[60%] mx-auto border border-gray-700 border-opacity-40 p-3'>
                    <div className='text-sm'> If you are looking to validate this story – check out
                        <span className='text-[#5FFD00]' > www.brandemic.in</span>
                    </div>
                    <div className='text-sm'>Now you have the story, it’s time you check out what we are really creating, check out our collection.  </div>
                    <div className='text-sm'>Fair Warning – Not For Everyone, Only For The Limitless </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page