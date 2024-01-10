import { NextResponse } from 'next/server';
import  dbConfig  from '@/lib/dbConfig';

export async function GET(){
    try{
        const investments = await dbConfig.investment.findMany({
            orderBy:{
                min: "asc"
            }
        })
        return NextResponse.json(investments)
    }catch(error){
        return NextResponse.error()
    }
}

export async function POST(req:Request) {
    const body = await req.json()
    const {name,min,max,profit,period,userId} = body
    console.log("body", body)
    const detailsInDb =  await dbConfig.investment.findMany({
        where: {
            name:name,
        }
    })
    console.log("db", detailsInDb)
    if (detailsInDb.length >=1 ) return new NextResponse("This data already exists", {status: 401})
    
    try{
        
        const createInvestment = await dbConfig.investment.create({
            data: {
                name:name,
                min:min,
                max:max,
                profit:profit,
                period:period,
                userId: userId
            }
        })
        return NextResponse.json(createInvestment)

    }catch(error){
        console.error("error",error)
        return  NextResponse.error()
    }
    
}