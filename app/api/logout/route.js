import { NextResponse } from "next/server"

export const GET = async(req, res) => {
    try {
        const response = NextResponse.json({
            message: "Logout Successfull", success: true
        })
        response.cookies.set("token", null, {
            httpOnly: true
        })
        return response
    } catch (error) {
        return NextResponse.json({ message: error.message}, { status: 500 })
    }
}