import React from 'react'
import Image from "next/image"
const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-10'>
    <Image src="/logo-color.png" width={100} height={100} alt='logo'/>
    <p className='text-2xl py-5'>Coming Soon. </p>
  </div>
  )
}

export default NotFound