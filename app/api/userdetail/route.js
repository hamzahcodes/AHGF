import { getDataFromToken } from "@helper/getDataFromToken"
import { NextResponse } from "next/server"
import User from "@models/User"
import { connectToDB } from "@utils/database"

export const GET = async (req, res) => {
    try {
        await connectToDB()
        const userID = await getDataFromToken(req)
        const user = await User.findOne({ _id: userID }).select("-password")
        return NextResponse.json({ data: user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}