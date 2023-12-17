import { Minus } from "lucide-react"
import React from "react"

const AboutHero = () => {
    return(
        <>
        <section className="dark:bg-black dark:text-white">
            <div className="bg-[url('/home/logo-no-background.png')] hover:invert bg-center bg-contain  py-64  bg-no-repeat items-center  flex flex-col  justify-center ">
                <div className="flex justify-center space-y-12 flex-col ">
                    {/* <h1 className="text-5xl">Exceptionally minded</h1>
                    <p className="flex italic text-3xl"><Minus/> People driven <Minus/></p> */}
                </div>
                <div className="pt-20">
                    {/* <button className="px-3 py-1 rounded-md mt-4  text-white  bg-amber-400">Get Started</button> */}
                </div>

            </div>
        </section>
        </>
    )
}
export default AboutHero