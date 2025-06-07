import { getDataFromToken } from "@/helpers/getdatafromtoken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/usermodel";
import { connect } from "@/dbconfig/dbconfig";
import { request } from "http";

connect()

export async function  GET(request:NextRequest){

    try{
         const userid= await getDataFromToken(request)
         const user= await User.findOne({_id:userid}).select("-password -isAdmin")
         return NextResponse.json({
               message:"User found", 
               data:user
         })
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:400})

    }

}


