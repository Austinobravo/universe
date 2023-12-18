import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <section >
        <div className='flex  h-[600px] w-full'>
            <div className='dark:bg-gradient-to-tl bg-black from-purple-800 to-blue-800 md:basis-2/3 py-10 justify-between flex-col md:flex hidden  md:pl-10'>
                <div className='space-y-7 '>
                    <h2 className='text-3xl  border-b-2 w-fit text-amber-400 border-amber-400'>Join Universe</h2>
                    <p className='dark:opacity-50 text-white'>Register and explore the universe investment.</p>
                </div>
                <div>
                    <Image src="/home/logo-no-background.png" width={300} height={100} alt="logo"/>
                </div>

            </div>
            <div className='md:py-40 py-20 px-10 '>
                <form className='space-y-5'>
                    <div>
                        <h1 className='text-2xl pb-2 opacity-80'>Create account</h1>
                    </div>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                        <div>
                            <label htmlFor='firstname'></label>
                            <input type='text' id='firstname' name='firstname'  placeholder="First Name" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full'/>
                        </div>
                        <div>
                            <label htmlFor='lastname'></label>
                            <input type='text' id='lastname' name='lastname' placeholder="Last Name" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full'/>
                        </div>

                    </div>
                    <div>
                        <label htmlFor='email'></label>
                        <input type='email' id='email' name='email' placeholder="Email" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full'/>
                    </div>
                    <div className='grid md:grid-cols-2 grid-cols-1 -full gap-3'>
                        <div>
                            <label htmlFor='password'></label>
                            <input type='password' id='password' name='password' placeholder="Password" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full'/>
                        </div>
                        <div>
                            <label htmlFor='confirm_password'></label>
                            <input type='password' id='confirm_password' name='confirm_password' placeholder="Confirm password" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full'/>
                        </div>

                    </div>
                    <div className="flex gap-2">
                        <label htmlFor='agreement'></label>
                        <input type='checkbox' id='agreement' name='agreement' className="cursor-pointer"/>
                        <p className="opacity-50">I agree to universe Terms and Conditions.</p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button type="submit" className="px-3 py-1 rounded-md  text-white  bg-amber-400">Register</button>
                        <p>or</p>
                        <Link href="/signin" className="font-bold">Login</Link>
                        <Link href="/admin" className="font-bold">Admin</Link>
                        
                    </div>
                    
                </form>
            </div>
        </div>
        
    </section>
  )
}

export default page