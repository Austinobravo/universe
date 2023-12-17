"use client"
import { Minus, Plus } from "lucide-react"
import React from "react"

const items = [
    {
        question: "What is a cryptocurrency exchange?",
        answer: "Cryptocurrency exchanges are digital marketplaces that enable users to buy and sell cryptocurrencies like Bitcoin, Ethereum, and Tether. The Universe exchange is the largest crypto exchange by trade volume."
    },
    {
        question: "How to earn from crypto on Universe?",
        answer: "Users can earn rewards on more than 180+ cryptocurrencies by using one of the products offered on Binance Earn. Our platform offers dozens of digital assets like Bitcoin, Ethereum, and stablecoins."
    },
    {
        question: "How to buy Bitcoin and other cryptocurrencies on Binance?",
        answer: "There are several ways to buy cryptocurrencies on Binance. You can use a credit/debit card, cash balance, or Apple Pay/Google Pay to purchase crypto on Binance. Before getting started, please make sure you’ve completed Identity Verification for your Binance account."
    },

]

const Faq = () => {
    const [current, setCurrent] = React.useState(0)

    return (
        <>
        <section className="md:px-32 space-y-7 px-10 py-20 dark:bg-black dark:text-white">
            <div className="text-center">
                <h3 className="md:text-5xl text-2xl">Frequently Asked Questions</h3>
            </div>
            <div className="space-y-4">
                {items.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className={`${current === index && "bg-white/50 rounded-md "}`}>
                                <div className={`flex justify-between items-center rounded-md ${current !== index && "hover:bg-white/20"} cursor-pointer px-6 py-2`} onClick={()=> setCurrent(index)}>
                                    <div className="flex items-center space-x-2">
                                    <p className="border rounded-md px-2 py-1">{index + 1}</p>
                                    <p className="text-lg ">{item.question}</p>
                                    </div>
                                    <div className="hover:!bg-amber-400 rounded-md px-2 py-1">
                                    {current === index ? 
                                    <Minus/> 
                                    :
                                    <Plus/>  
                                    }
                                    </div>
                                </div>
                                {current === index && 
                                    <div>
                                        <p className="pr-8 pl-14 text-sm py-2">{item.answer}</p>
                                    </div>
                                
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
        </>
    )
}
export default Faq