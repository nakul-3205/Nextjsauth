import { connect } from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/usermodel";
import { error } from "console";

connect()

export async function POST(request:NextRequest){

    try {
        const reqBody=await request.json()
        const {token}=reqBody
        console.log(" Received token:", token);
      const user=await  User.findOne({verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()}
        })
            console.log(" Matched user:", user);
        if(!user){
            return NextResponse.json({error:"Invalid Token"},{status:400})
        }
        console.log(user)
        user.isVerified=true
        user.verifyToken=undefined
        user.verifyTokenExpiry=undefined
        await user.save()
        return NextResponse.json({
            message:"Email verified Sucessfully",
            sucess:true
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }

}