"use client"
import { BusIcon, ChevronDown, Currency, LayoutDashboard, Menu, Ticket, User, X } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const sidelinks = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard"
    },
    {
        name: "Transactions",
        icon: Currency,
        href: "",
        children: [
            {
               type: "Withdrawal",
               href: "/withdrawals"
            },
            {
               type: "Deposits",
               href: "/deposits"
            },    
        ]
    },
    {
        name: "Users",
        icon: User,
        href: "",
        children: [
            {
               type: "Admin",
               href: "/team"
            },
            {
               type: "Users",
               href: "/users"
            },    
        ]
    },
    {
        name: "Investment Plans",
        icon: BusIcon,
        href: "/investment"
    },
    {
        name: "Tickets",
        icon: Ticket,
        href: "/tickets"
    },
]
interface Props{
    func: () => void
}

const Sidebar = ({func}: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const [itemsToggle, setItemsToggle] = React.useState(false)
    const [current, setCurrent] = React.useState(0)
    const [active, setActive] = React.useState("")

  return (
    <>
    <section>

        <div className='h-[55rem] shadow-2xl bg-white w-60 border-r-2'>
         
                <div className='space-y-6 pt-5 font-semibold shadow-none '>
                    {sidelinks.map((each, index) => {
                        const Icon = each.icon
                        return (
                            <div key={index}>
                                <Link href={each.href}>
                                    <div className={`${pathname === each.href  && "!bg-gradient-to-tl  !from-purple-800 !to-blue-800 p-2 rounded-tr-lg rounded-br-lg  text-white "} ${active === each.name && "!bg-gradient-to-tl  !from-purple-800 !to-blue-800 p-2 rounded-tr-lg rounded-br-lg  text-white "}  flex hover:bg-slate-500 py-2  px-3 justify-between`} onClick={()=>{setActive("")}}>
                                        <div className='flex gap-x-2'>
                                            <Icon/>
                                            <h2 className='flex'>{each.name} </h2>

                                        </div>
                                        <span onClick={() => {setItemsToggle(!itemsToggle), setCurrent(index)}}>{each?.children ? <ChevronDown/> : ""}</span>
                                    </div>
                                    {itemsToggle && current === index &&
                                    <div className={`flex-col flex pl-8 pt-4 gap-y-3 ${itemsToggle && 'bg-slate-500'}`}>
                                        {each.children?.map((child, index) => (
                                            <div onClick={()=>{setActive(each.name), setItemsToggle(!itemsToggle), func()}}   className='hover:text-white'>
                                            <Link key={index} href={child.href} className='hover:text-white' >
                                                {child.type} 
                                            </Link>
                                            </div>

                                        ))}
                                    </div>
                                    }
                                </Link>

                            </div>

                        )
                    })}

                </div>
        </div>


    </section>
    
    </>
  )
}

export default Sidebar