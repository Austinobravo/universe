"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import DarkModeButton from "@/components/DarkModeButton"
import { Bitcoin, BookUser, Menu, ShipWheel, Users, X } from "lucide-react"


const Navbar = ({}) => {
    const [toggle, setToggle] = React.useState(false)
    const [toggleSwitch, setToggleSwitch] = React.useState(false)
    const navlinks = [
        {
            icon: Bitcoin,
            href: "",
            name: "Buy Crypto"
        },
        {
            icon: ShipWheel,
            href: "",
            name: "Markets"
        },
        {
            icon: Users,
            href: "",
            name: "About Us"
        },
        {
            icon: BookUser,
            href: "",
            name: "Contact Us"
        },
    ]
    const authlinks = [
        {
            href: "",
            name: "Login"
        },
        {
            href: "",
            name: "Register"
        },

    ]

    return(
        <>
        <nav className="bg-white  text-sm text-black dark:bg-black  border-b-2 shadow dark:text-white py-2 md:flex hidden items-center px-10 justify-between">
            <div className="flex space-x-2">
                <div >
                    <Link href="/" >
                        <Image src="/home/logo-no-background.png" width={100} height={1} alt="Logo"/>
                    </Link>

                </div>
                <div className="flex items-center space-x-7">
                    {navlinks.map((link,index)=> (
                            <ul key={index}>
                            <Link href={link.href}>
                                <li>{link.name}</li>
                            </Link>
                            </ul>
                    ))}
                </div>
            </div>
            <div className="flex space-x-7 items-center">
                <div className="flex items-center space-x-3">
                    {authlinks.map((link,index)=> (
                            <ul  key={index}>
                            <Link href={link.href}>
                                <li className={`${link.name==="Register" && "bg-amber-400 text-white py-2 px-4 rounded-md"}`}>{link.name}</li>
                            </Link>
                            </ul>
                    ))}
                </div>
                <div className="cursor-pointer">
                    <DarkModeButton size={20}/>
                </div>

            </div>

        </nav>
            <nav className={`${toggle && 'h-screen'} md:hidden bg-white  text-sm text-black dark:bg-black/80  border-b-2 shadow dark:text-white`}>
                <div className="flex items-center justify-between w-full px-6">
                    <div >
                        {!toggle ? 
                            <Link href="/" >
                                <Image src="/home/logo-no-background.png" width={100} height={1} alt="Logo"/>
                            </Link> 
                        :
                        <div className="border rounded-full py-1 pr-6 pl-1 cursor-pointer" >
                            <div style={{transform: `translateX(${toggleSwitch ? 0 : "20px"})`, transition: "transform 0.5s linear"}} onClick={() => setToggleSwitch(!toggleSwitch)}>
                                <DarkModeButton size={20}/>
                            </div>
                        </div>
                        }

                    </div>
                    <div className="cursor-pointer">
                        {toggle ? 
                        <div onClick={() => setToggle(!toggle)} className="p-5">
                            <X size={40}/>  
                        </div>
                        :
                        <div onClick={() => setToggle(!toggle)}>
                            <Menu/>  
                        </div>
                        }

                    </div>

                </div>
                {toggle && (
                    <>
                    <div className=" px-7 ">
                        <div className="flex space-x-4 items-center w-full">
                            <ul className="flex gap-3  w-full">
                            {authlinks.map((link,index) => (
                                    <Link  key={index} href={link.href} className="basis-1/2" >
                                        <li className={`${link.name==="Register" && "!bg-amber-400 "} text-base text-white text-center  rounded-md py-2 px-12 w-full bg-black/50`}>{link.name}</li>
                                    </Link>
                            ))}
                            </ul>
                        </div>
                        <div className="flex flex-col pt-10 text-lg w-full">
                                <ul>
                                {navlinks.map((link, index) => (
                                    <Link  key={index} href={link.href}  >
                                        <li className="flex space-x-2 hover:bg-black/40 hover:rounded-md py-3 px-4 items-center"><span><link.icon size={16}/></span> <span>{link.name}</span></li>
                                    </Link>
                                ))}
                                </ul>
                        </div>
                    </div>

 
                    </>
                )}


            </nav>
        </>
    )
}
export default Navbar