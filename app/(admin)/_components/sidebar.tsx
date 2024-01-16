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


const Sidebar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [itemsToggle, setItemsToggle] = React.useState(false)
    const [current, setCurrent] = React.useState(0)
    const [active, setActive] = React.useState("")
    const [toggle, setToggle] = React.useState(true)

    React.useEffect(() => {
        
    })
  return (
    <>
    <section>
    {!toggle ? 
        <div className='h-[55rem] shadow-2xl bg-white w-60 border-r-2'>
            <div className='flex  border-b-2 items-center space-x-2 py-4 ml-auto w-full pointer' onClick={() => setToggle(!toggle)}>
                <X size={35}/>
                {/* <Image src="/home/logo-no-background.png" width={100} height={100} alt="logo"/> */}

            </div>
                <div className='space-y-6 pt-5 font-semibold shadow-none '>
                    {sidelinks.map((each, index) => {
                        const Icon = each.icon
                        return (
                            <div key={index}>
                                <Link href={each.href}>
                                    <div className={`${pathname === each.href  && "!bg-gradient-to-tl  !from-purple-800 !to-blue-800 p-2 rounded-tr-lg rounded-br-lg  text-white "} ${active === each.name && "!bg-gradient-to-tl  !from-purple-800 !to-blue-800 p-2 rounded-tr-lg rounded-br-lg  text-white "}  flex hover:bg-slate-500 py-2  px-3 justify-between`} onClick={()=>{setActive(""), each?.children ? "" : setToggle(!toggle)}}>
                                        <div className='flex gap-x-2'>
                                            <Icon/>
                                            <h2 className='flex'>{each.name} </h2>

                                        </div>
                                        <span onClick={() => {setItemsToggle(!itemsToggle), setCurrent(index)}}>{each?.children ? <ChevronDown/> : ""}</span>
                                    </div>
                                    {itemsToggle && current === index &&
                                    <div className={`flex-col flex pl-8 pt-4 gap-y-3 ${itemsToggle && 'bg-slate-500'}`}>
                                        {each.children?.map((child, index) => (
                                            <div key={index} onClick={()=>{setActive(each.name), setItemsToggle(!itemsToggle), setToggle(!toggle)}}   className='hover:text-white'>
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
            : 
                <div className="pt-10 pl-5 pointer" onClick={()=> setToggle(!toggle)}><Menu size={30}/></div>
    }

    </section>
    </>
  )
}
export default Sidebar