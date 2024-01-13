import { getCurrentUser } from '@/lib/session';
import  dbConfig  from '@/lib/dbConfig';
import { NextResponse } from 'next/server';

export async function GET(){
    const user = await getCurrentUser()
    try{
        const data = await dbConfig.withdrawals.findMany({
            where:{
                userId: user?.id

            }
        })
        return NextResponse.json(data)
    }catch(error){
        return NextResponse.error()
    }
}