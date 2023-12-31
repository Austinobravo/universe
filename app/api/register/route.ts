import dbConfig from "@/lib/dbConfig";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const body = await req.json()
    const {firstname, lastname, email, password, confirm_password} = body

    if(password !== confirm_password) return new NextResponse("Passwords must match", {status:400})

    const  hashedPassword = await bcrypt.hash(password, 8)

    try{
        const user = await dbConfig.user.create({
            data:{
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: hashedPassword
            }
        })
        return NextResponse.json(user)

    }catch(error){
        console.error("Register error", error)
        return NextResponse.error()
    }   
}   