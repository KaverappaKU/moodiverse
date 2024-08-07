import User from "@/lib/models/users";
import connect from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { fullname, email, password} = await request.json();

    await connect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return new NextResponse("User already exists", {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        fullname,
        email,
        password: hashedPassword
    })
    
    try{
        await newUser.save();
        return new NextResponse(JSON.stringify({message: "User created successfully"}), {status: 200});
    }
    catch(error: any) {
        return new NextResponse("Error creating user", {status: 500});
    }
}