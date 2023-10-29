import { connectToDB } from "@utils/database"
import { NextResponse } from "next/server"
import User from "@models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const POST = async (req, res) => {
    try {
        const { phoneNumber, password } = await req.json()
        
        await connectToDB()

        const existingUser = await User.findOne({ phoneNumber })
        if(!existingUser) return NextResponse.json({ message: "User does not exist"}, { status: 400 })

        const validPassword = await bcrypt.compare(password, existingUser.password)
        if(!validPassword) return NextResponse.json({ message: "Invalid Password"}, {status: 400})

        // create token data
        const tokenData = {
            id: existingUser._id,
            username: existingUser.username,
            phoneNumber: existingUser.phoneNumber 
        }
        // console.log("token data: ", tokenData);
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login Successfull", success: true, token
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response
    } catch (error) {
        return NextResponse.json({ message: error.message}, { status: 500 })
    }
}