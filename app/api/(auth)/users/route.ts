import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/modals/users";

export const GET = async () => {
    try{
        await connect();    
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), {status: 200});
    }
    catch(error){
        return new NextResponse("Error in fetching users"+ error, {status: 500});
    }
}