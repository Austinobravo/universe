import { NextResponse } from 'next/server';
import  dbConfig  from '@/lib/dbConfig';
export async function GET(){

    try{
        const users = await dbConfig.user.findMany({
            orderBy: {
                firstName: "asc"
            }
        })
        console.log(users)
        return NextResponse.json(users, {status:200})
    }catch(error){
        return  NextResponse.error()
    }
}