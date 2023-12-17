import { LucideIcon } from "lucide-react"
import Link from "next/link"
import React from "react"

interface Props{
    icon: LucideIcon
    heading: string
    gain: number
    min: number
    max: number
    href: string
}
const Card = ({icon:Icon, heading, gain, min, max, href}: Props) => {

    return (
        <>
            <div className="shadow border-amber-400 dark:border-2 dark:bg-white/20 bg-black/50 bg-gradient-to-tl from-green-800 to-black rounded-md text-white py-10 px-5 space-y-7">
                <div className="flex flex-col justify-center items-center w-full mx-auto">
                    <Icon size={40} color="gold"/>
                    <h2 className="text-lg dark:text-white opacity-50 font-bold">{heading}</h2>
                </div>
                <div>
                    <p className="text-center dark:text-green-500 text-lg font-bold">{gain}.00%</p>
                </div>
                <div>
                    <h3 className="text-2xl ">${min} <span className="text-xs opacity-80">min</span></h3>
                    <h3 className="text-2xl ">${max} <span className="text-xs opacity-80">max</span></h3>
                </div>
                <div>
                    <Link href={href}>
                        <button className="bg-amber-400 py-2 px-4 rounded-md text-white font-bold">Get Started</button>
                    </Link>
                </div>

            </div>
        </>
    )
}
export default Card