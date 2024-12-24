import React from 'react'
import { FAQ } from '../data/data'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Header from '../header/Header'
import Footer from '../footer/Footer'

const page = () => {
    return (
        <>
            <Header />
            <div className='bg-[#000000] min-h-screen w-full flex justify-center items-center text-[#ffffff] '>
                <div className='flex flex-wrap  m-5'>
                    <div className='w-[200px] text-3xl my-3 tracking-wide font-semibold'> FAQs </div>
                    <div>
                        {FAQ.map((faq) => (
                            <div className='flex flex-col gap-4'>
                                <div className='text-2xl my-4'>
                                    {faq.title}
                                </div>
                                <div>
                                    {faq.data.map((data) => (
                                        <Accordion type="single" collapsible className='max-w-[600px] '>
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger>
                                                    {data.question}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    {data.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page