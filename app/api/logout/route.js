import { NextResponse } from "next/server"

export const GET = async(req, res) => {
    try {
        const response = NextResponse.json({
            message: "Logout Successfull", success: true
        })
        response.cookies.set("token", false, {
            httpOnly: true,
            expires: new Date(0) 
        })
        return response
    } catch (error) {
        return NextResponse.json({ message: error.message}, { status: 500 })
    }
}