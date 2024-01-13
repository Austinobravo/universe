"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React from "react"

const items = [
    {
        heading: "10 years+",
        sub_heading: "Historical Data"
    },
    {
        heading: "11000+",
        sub_heading: "Coins"
    },
    {
        heading: "2000+",
        sub_heading: "NFTs"
    },
    {
        heading: "900+",
        sub_heading: "Exchanges"
    },
    {
        heading: "5",
        sub_heading: "Investment Plans"
    },
]

const Slider = () => {
    const [current, setCurrent] = React.useState(0)
    const nextFunction = () => {
        setCurrent(() => current === items.length -1 ? 0 : current + 1)
        
    }
    const prevFunction = () => {
        setCurrent(() => current === 0 ? items.length -1 : current - 1)
    }
    
    React.useEffect(() => {
        if (typeof window !== "undefined"){
            const interval = setInterval(() => (
                nextFunction()
            ), 5000
            )
            return () => clearInterval(interval)
        }
    }, [current])

    return (
        <>
            <section className="bg-white dark:bg-black py-10">
                <div className="md:px-32 px-10 text-black dark:text-white">
                    <div className=" text-center py-10 font-bold space-y-3">
                        <h2 className="md:text-5xl text-2xl ">Consistent Crypto Data</h2>
                        <p className="text-sm md:text-base opacity-50">Access real-time crypto price, market data, NFT floor prices, historical data and Investment Plans.</p>
                    </div>
                    <div className=" md:grid hidden grid-cols-3 justify-center text-center gap-10">
                        {items.map((item, index) => (
                            <div key={index}>
                                <div className="space-y-2">
                                    <h2 className="text-green-500 text-6xl">{item.heading}</h2>
                                    <p className=" dark:text-white opacity-90  text-sm">{item.sub_heading}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="md:hidden block">
                        {items.map((item, index) => (
                            <div key={index} className="">
                                <div className={`space-y-2 text-center flex items-center justify-center space-x-3 leading-tight ${current === index ? "" : "hidden"}`}>
                                    <ChevronLeft onClick={prevFunction} color="black" size={30} className="rounded-full hover:bg-amber-400 cursor-pointer bg-white "/>
                                        <div>
                                            <h2 className={`text-green-500 text-6xl ${item.heading === "10 years+" && "text-4xl"}`}>{item.heading}</h2>
                                            <p className=" dark:text-white opacity-90  text-sm">{item.sub_heading}</p>
                                        </div>
                                    <ChevronRight onClick={nextFunction} color="black" size={30} className="rounded-full hover:bg-amber-400 cursor-pointer bg-white "/>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </>
    )
}
export default Slider