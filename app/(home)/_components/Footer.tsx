import React  from 'react'

const Footer = () => {

    return (
        <>
            <section className="dark:bg-black dark:text-white px-10 space-y-10">
                <div className="flex items-center flex-wrap md:flex-nowrap p-10 space-y-4 md:justify-between justify-center border-slate-800 border-y-2">
                    <div className="">
                        <h4>Interested to stay up-to-date with cryptocurrencies?</h4>
                        <p className="opacity-50">Get the latest crypto news, updates, and reports by subscribing to our free newsletter.</p>
                    </div>
                    <div>
                        <form className="flex flex-col  md:flex-row space-y-1 ">
                            <input type="email" className="w-[200px] py-1  px-2 mr-2 focus:border-amber-400 border-2 dark:text-black  outline-none" placeholder="Enter your email" required/>
                            <button type="submit" className="px-3 py-1 rounded-md  text-white  bg-amber-400">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="opacity-50  text-sm">&copy; {new Date().getFullYear()} Universe. All Rights Reserved.</p> 
                    <div>
                        <p className="opacity-50 md:text-sm text-xs text-justify"><span className="underline">IMPORTANT DISCLAIMER:</span> All content provided herein our website, hyperlinked sites, associated applications, forums, blogs, social media accounts and other platforms (“Site”) is for your general information only, procured from third party sources. We make no warranties of any kind in relation to our content, including but not limited to accuracy and updatedness. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose. Any use or reliance on our content is solely at your own risk and discretion. You should conduct your own research, review, analyse and verify our content before relying on them. Trading is a highly risky activity that can lead to major losses, please therefore consult your financial advisor before making any decision. No content on our Site is meant to be a solicitation or offer.</p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Footer