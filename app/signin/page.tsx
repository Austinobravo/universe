"use client"
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession, signOut } from 'next-auth/react'
import { Loader } from 'lucide-react'


const page = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)
    const {data:session, status} = useSession()
    const [user , setUser] = React.useState({
        email: "",
        password: ""
    })
    const [error, setError] = React.useState("")
    
    const Login = async (e:any) => {
        e.preventDefault()
        console.log("Login before")
        try{
            setIsLoading(true)
            const data = await signIn('credentials', {
                email: user.email,
                password: user.password,
                redirect: false,
                
            })
            if(data?.error) setError(data.error); else setError("")

            // if (data?.status === 200 && status==="authenticated" && session?.user.role === "Admin"){
            //     return router.push("/dashboard")
            // }else if (data?.status === 200 &&  status==="authenticated" && session?.user.role === "User"){
            //     return router.push("/user_dashboard")
            // }
            // console.log("log")
            
        }catch(error){
            console.error(error)
        }finally{
            setIsLoading(false)
        }
    }

    const logOut = () => {
        signOut({redirect:false,callbackUrl: "/signin"})
    }


    const onChange = (e: any) => {
        e.preventDefault()
        const {name, value} = e.target
        setUser({...user, [name]:value})
        
    }
    React.useEffect(() => {
        // Check if the user is authenticated and has a role
        if (status === 'authenticated' && session?.user?.role) {
            // Redirect based on user role
            if (session.user.role === 'Admin') {
                router.push('/dashboard');
            } else if (session.user.role === 'User') {
                router.push('/user_dashboard');
            }
        }
    }, [status, session, router]);
  return (
    <section >
        {status === "unauthenticated" ? (
            <div className='flex   h-[600px] w-full'>
                <div className='dark:bg-gradient-to-tl bg-black from-purple-800 to-blue-800 md:basis-2/3 py-10 justify-between flex-col md:flex hidden  md:pl-10'>
                    <div className='space-y-7 '>
                        <h2 className='text-3xl  border-b-2 w-fit text-amber-400 border-amber-400'>Login</h2>
                        <p className='dark:opacity-50 text-white'>Signin and explore the universe investment.</p>
                    </div>
                    <div>
                        <Image src="/home/logo-no-background.png" width={300} height={100} alt="logo"/>
                    </div>

                </div>
                <div className='md:py-40 py-16 px-10 w-full '>
                    <form className='space-y-5' onSubmit={(e) => Login(e)}>
                        <div>
                            <h1 className='text-2xl pb-2 opacity-80'>Enter your email and password</h1>
                        </div>
                        {error &&
                            <div className='text-center rounded-md shadow-md'>
                                <span className='text-red-500 py-3 px-1 w-full'>{error}</span>
                            </div>
                        }
                        <div>
                            <label htmlFor='email'></label>
                            <input type='email' onChange={(e) => onChange(e)} value={user.email} id='email' name='email' placeholder="Email" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full'/>
                        </div>
                        <div>
                            <label htmlFor='password'></label>
                            <input type='password' onChange={(e) => onChange(e)} value={user.password} id='password' name='password' placeholder="Password" className='border-2 border-black rounded-md p-1 focus:border-blue-400 outline-none w-full'/>
                        </div>

                        <div className="flex gap-2">
                            <label htmlFor='agreement'></label>
                            <input type='checkbox' id='agreement' name='agreement' className="cursor-pointer"/>
                            <p className="opacity-50">Keep me logged in.</p>
                        </div>
                        <div className="flex gap-5 items-center">
                            <button type="submit" className={` px-3 py-1 rounded-md  text-white  bg-amber-400`}>{isLoading ? (<Loader className='animate-spin'/> ) : "Login"}</button>
                            <p>or</p>
                            <Link href="/signup" className="font-bold">Create Account</Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        ):
            (
                <div className='flex flex-col items-center  space-y-2 py-5'>
                    <p className='text-center text-2xl'>You are signed in</p>
                    <button className={` px-3 py-1 rounded-md w-fit text-white  bg-amber-400`} onClick={logOut}>Logout</button>
                </div>  
            )
        }
        
    </section>
  )
}

export default page