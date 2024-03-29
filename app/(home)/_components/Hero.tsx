"use client"
import React from 'react'
import Image from "next/image"
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'

const Hero = () => {
    const [allCoins, setAllCoins] = React.useState<any[]>([])

    React.useEffect(() => {
        if (typeof window !== "undefined"){
            const fetchData = async () => {
                const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
                setAllCoins(response.data)
            }
            fetchData()
        }
    }, [])
    

    return (
        <>
        <section className='md:px-32 px-10 dark:bg-black dark:text-white'>
            <div className="flex flex-wrap md:flex-nowrap gap-x-10 gap-y-2">
                <div className="md:basis-1/2 py-20 space-y-7 md:text-left text-center">
                    <h1 className='md:text-5xl md:pt-10 text-2xl font-bold leading-snug'>The most reliable & comprehensive cryptocurrency platform for traders and developers</h1>
                    <div >
                        <Link href="/signin" className='bg-amber-400  text-white py-4 px-10 font-bold rounded-md'>Get Started</Link>
                    </div>

                </div>


                <div className="md:basis-1/2 md:py-20 ">
                    <div className="bg-black/50 dark:bg-white/20 mx-auto py-10 px-5 space-y-4  w-full rounded-md">
                        {allCoins.slice(0,7)?.map((coin, index) => (
                            <div key={index} className=' flex justify-between  cursor-pointer hover:bg-slate-700 p-1 space-x-5 rounded-md '>
                                <div className='flex space-x-2'>
                                    <Image src={coin.image} width={20} height={20} alt={coin.name} className='invert rounded-full'/>
                                    <h2 className='font-bold text-white'>{coin.symbol.toUpperCase()}</h2>
                                    <h3 className='opacity-50'>{coin.name}</h3>
                                </div>
                                <div>
                                    <p className='font-bold text-white'>${coin.current_price}</p>
                                </div>
                                <div>
                                    <p className='font-bold text-amber-400'>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                                </div>

                            </div>
                        ))}
                        {allCoins.length == 0 ? 
                            <p className='text-white opacity-50 text-center'>No coins listed yet</p>
                        : 
                        <Link href="">
                            <p className='flex text-xs pt-5 items-center opacity-60'>View all coins <ChevronRight size={15}/></p>
                        </Link>
                        
                        }
                        

                    </div>

                </div>

            </div>

        </section>
        
        </>
    )
}
export default Hero