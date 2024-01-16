import React from 'react'
import Image from "next/image"
const page = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
    <Image src="/logo-color.png" width={100} height={100} alt='logo'/>
    <p className='text-2xl py-5'>Coming Soon. </p>
  </div>
  )
}

export default page