import dbConfig from "@/lib/dbConfig";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const body = await req.json()
    const {firstname, lastname, email, password, confirm_password} = body

    if(password !== confirm_password) return new NextResponse("Passwords must match", {status:401})

    const existingEmail = await dbConfig.user.findUnique({
        where: {
            email:email
        }
    })
    if (existingEmail) return new NextResponse("Email already in use", {status:401})

    
    
    const  hashedPassword = await bcrypt.hash(password, 10)
    try{
        const user = await dbConfig.user.create({
            data:{
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: hashedPassword
            }
        })
        const {password, ...newUser} = user
        return NextResponse.json(newUser)

    }catch(error){

        console.error("Register error", error)
        return NextResponse.error()
    }   
}   