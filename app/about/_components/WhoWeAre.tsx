import Image from 'next/image'
import React from 'react'
const items = [
    {
        title: "Who we are",
        image: "/logo-white.png",
        paragraph: "Universe is a firm partnering with several investment companies to offer diverse investment services to clients globally. With over 6 years of experience, we offer the most competitive investment profit rates in the market place. Driven by an unflagging vision and commitment to be a contemporary brokerage community, able to offer innovative platforms and solutions to evolving client appetite. We have built a brand of excellence and professionalism, now everyone has the opportunity to take on the market."
    },
    {
        title: "Our Mission",
        image: "/About-Us.webp",
        paragraph: "Our mission is to revolutionize the way people invest globally. We are constantly looking for ways to revolutionize the investment industry by facilitating our client's experience and offering personalized solutions in wealth management for individuals, families, family offices and asset managers. At BlesDolt, our duty lies in your financial success. Our Mission is to To empower people to invest globally by offering personalized solutions for each investor."
    },
]
const WhoWeAre = () => {
  return (
    <section className='md:px-32 px-10 dark:bg-black dark:text-white'>
        <div className='flex flex-wrap md:flex-nowrap pt-10  gap-10  justify-center '>
            {items.map((item, index) => (
            <div key={index} className='shadow-2xl dark:border-white/50 dark:bg-white/50 dark:border rounded-md  w-[400px] '>
                <Image src={item.image} width={500} height={1} alt={item.title} className='h-64 border-b-2'/>
                <div className='px-5'>
                <h3 className='text-3xl py-2'>{item.title}</h3>
                <p className='text-xs '>{item.paragraph}</p>
                </div>
            </div>

            ))}
        </div>

        
    </section>
  )
}

export default WhoWeAre