"use client"
import useColorMode from '@/hooks/useColorMode'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react';
 
interface Props{
    size: number
}

const DarkModeButton = ({size}: Props) =>{
    const [colorMode, setColorMode] = useColorMode()
    const [mounted, setMounted] = useState(false)

    useEffect(()=>{
        if(typeof window !== "undefined"){
            setMounted(true)
        }
    }, [])
    if(!mounted){
        return null
    }
    return(
        <>
        {colorMode === "light" && (
            <div onClick={() => setColorMode('dark')} className="pointer-cursor">
                <Sun size={size}/>
            </div>
        )}
        {colorMode === "dark" && (
            <div onClick={() => setColorMode('light')} className="pointer-cursor">
                <Moon size={size}/>
            </div>
        )}
        
        </>
    )

}
export default DarkModeButton