"use client"
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'

const page = () => {
    const router = useRouter()
    const [passwordError, setPasswordError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const  [user, setUser] = useState(
        {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirm_password: ""
        }
    )

    const onChange = (e: any) => {
        e.preventDefault()
        const {name, value} = e.target
            // if (user.password !== user.confirm_password){
            //     setPasswordError("Passwords don't match")
            //     console.log("PasswordError",passwordError)
            // }else{
            //     setPasswordError("")
            // }
        setUser({...user, [name]:value})
        
    }

    const onSubmit = async (e:any) => {
        e.preventDefault()
        const data = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            confirm_password: user.confirm_password
        }
        console.log("data",data)
        
        try{
            setIsLoading(true)
          axios.post("/api/register", data)  
          .then((response: any)=> {
            if(response.status === 200) router.push("/signin")
          })
          .catch((error)=> {
              console.error(`Signup Api Error: ${error}`)
            
          })
          .finally(()=>{
          })

        }catch(error: any){
            console.error(`Signup Error: ${error}`)
        }finally{
            setIsLoading(false)
        }

    }
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
                <form className='space-y-5' onSubmit={(e)=>onSubmit(e)}>
                    <div>
                        <h1 className='text-2xl pb-2 opacity-80'>Create account</h1>
                    </div>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                        <div>
                            <label htmlFor='firstname'></label>
                            <input type='text' onChange={(e)=>onChange(e)} value={user.firstname} id='firstname' name='firstname'  placeholder="First Name" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' required/>
                        </div>
                        <div>
                            <label htmlFor='lastname'></label>
                            <input type='text' onChange={(e)=>onChange(e)} value={user.lastname} id='lastname' name='lastname' placeholder="Last Name" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' required/>
                        </div>

                    </div>
                    <div>
                        <label htmlFor='email'></label>
                        <input type='email' onChange={(e)=>onChange(e)} value={user.email} id='email' name='email' placeholder="Email" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' required/>
                    </div>
                    <div className='grid md:grid-cols-2 grid-cols-1 -full gap-3'>
                        <div>
                            <label htmlFor='password'></label>
                            <input type='password' onChange={(e)=>onChange(e)} value={user.password} id='password' name='password' placeholder="Password" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' required/>
                            {passwordError && <p>{passwordError}</p>}
                        </div>
                        <div>
                            <label htmlFor='confirm_password'></label>
                            <input type='password' onChange={(e)=>onChange(e)} value={user.confirm_password} id='confirm_password' name='confirm_password' placeholder="Confirm password" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full' required/>
                            {passwordError && <p>{passwordError}</p>}
                        </div>

                    </div>
                    <div className="flex gap-2">
                        <label htmlFor='agreement'></label>
                        <input type='checkbox' id='agreement' name='agreement' className="cursor-pointer" required/>
                        <p className="opacity-50" >I agree to universe Terms and Conditions.</p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button type="submit" className="px-3 py-1 rounded-md  text-white  bg-amber-400">{isLoading ? (<Loader className='animate-spin'/> ) : "Register"}</button>
                        <p>or</p>
                        <Link href="/signin" className="font-bold">Login</Link>
                    </div>
                    
                </form>
            </div>
        </div>
        
    </section>
  )
}

export default page