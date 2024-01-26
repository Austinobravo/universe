import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './(home)/_components/Navbar'
import Footer from './(home)/_components/Footer'
import Provider from '@/components/providers/Provider'
import  ToastProvider  from '@/components/providers/react-toast-provider'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Universe:The most reliable & comprehensive cryptocurrency platform for traders',
  description: 'The most reliable & comprehensive cryptocurrency platform for traders',
  other:{
    "og:image": 'url("/logo-black.png")',
    "og:type": "website"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark `}><Provider><ToastProvider/><Navbar/><div className="pt-16">{children}</div> <Footer/></Provider><Analytics/></body>
    </html>
  )
}
