"use client"
import Card from "@/components/Card"
import { getInvestments } from "@/lib/getDetails"
import { Bitcoin } from "lucide-react"
import { useSession } from "next-auth/react"
import React from "react"

const items = [
    {
        icon: Bitcoin,
        gain: 10,
        heading: "Starter",
        min: 150,
        max: 2499,
        href: ""
    },
    {
        icon: Bitcoin,
        gain: 14,
        heading: "Classic",
        min: 2500,
        max: 14999,
        href: ""
    },
    {
        icon: Bitcoin,
        gain: 25,
        heading: "Pro",
        min: 15000,
        max: 40000,
        href: ""
    },
    {
        icon: Bitcoin,
        gain: 50,
        heading: "Executive",
        min: 50000,
        max: 100000,
        href: ""
    },
]
const Plans = () => {
  const [items, setAllItems] = React.useState<any[]>([])
  const {data:session} = useSession()

    React.useEffect(() => {
        const data = async () => {
          const investment = await getInvestments()
          setAllItems(investment.data)
        }
        data()
      })


    return (
        <>
        <section className="md:px-32 px-20 dark:bg-black bg-white py-20">
            <div>
                <h3 className="text-center  text-2xl md:text-5xl dark:text-white ">Why Investors keep investing?</h3>
            </div>
            <div className="grid md:grid-cols-4 grid-cols-1 gap-10 py-10 ">
                {items?.map((item, index) => (
                    <div key={index}>
                        <Card icon={Bitcoin} gain={item.profit} heading={item.name} min={item.min} max={item.max} href={session?.user ? session?.user.role ==="User" ? "/user_deposits" : "/deposits" : "/signin"}/>
                    </div>

                ))}
            </div>

        </section>
            </>

    )

}
export default Plans