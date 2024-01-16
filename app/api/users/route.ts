import { NextResponse } from 'next/server';
import  dbConfig  from '@/lib/dbConfig';
export async function GET(){

    try{
        const users = await dbConfig.user.findMany({
            orderBy: {
                firstName: "asc"
            }
        })

        return NextResponse.json(users, {status:200})
    }catch(error){
        return  NextResponse.error()
    }
}

export async function PATCH(req: Request){
    const body = await req.json()
    const {firstName, lastName, role,email,id} = body

    try{
        const data = await dbConfig.user.update({
            where:{
                id: id
            },
            data:{
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role
            }
        })
        const {password, ...UserFound} = data
        return NextResponse.json(UserFound)
    }catch(error){
        return NextResponse.error()
    }

}