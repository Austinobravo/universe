import React from 'react'
import Image from "next/image"

const Brief = () => {
  return (
    <section className='dark:bg-black dark:text-white md:px-32 px-10 py-20'>
        <div className='flex flex-wrap md:flex-nowrap gap-10 '>
            <div className='md:basis-1/2 space-y-7'>
                <h2 className='opacity-50 text-sm'>Get to know more about us</h2>
                <h3 className='md:text-5xl text-4xl'>Who is Universe?</h3>
                <p className='leading-loose opacity-70'>Universe is a firm partnering with several investment companies to offer diverse investment services to clients globally. With over 6 years of experience, we offer the most competitive investment profit rates in the market place. Driven by an unflagging vision and commitment to be a contemporary brokerage community, able to offer innovative platforms and solutions to evolving client appetite. We have built a brand of excellence and professionalism, now everyone has the opportunity to take on the market.</p>
            </div>
            <div className='md:basis-1/2'>
                <Image src="/home/bitcoin.jpg" width={500} height={200} alt=""/>
            </div>

        </div>
        
    </section>
  )
}

export default Brief