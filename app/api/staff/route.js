import { connectToDB } from "@/utils/database"
import Staff from "@/models/Staff"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        await connectToDB();
        const staff = await Staff.find({})
        return NextResponse.json({ message: staff }, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const POST = async (req, res) => {
    const { name, phone, salary } = await req.json()
    try {
        await connectToDB()

        const newStaff = new Staff({
            name: name,
            phone: phone,
            salary: salary
        })
        const createdStaff = await Staff.create(newStaff)
        return NextResponse.json({ message: newStaff }, { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const PUT = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('staffID')

    const { name, phone, salary } = await req.json()

    // console.log(staffUpdate)
    try {
        await connectToDB()

        const updatedStaff = await Staff.findByIdAndUpdate(id, {
            name: name,
            phone: phone,
            salary: salary
        })

        if(updatedStaff) return NextResponse.json({ message: updatedStaff }, { status: 200 })
        return NextResponse.json({ message: 'Staff details not updated' }, { status: 404 }) 
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const DELETE = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('staffID') 

    try {
        await connectToDB()

        const deletedStaff = await Staff.findByIdAndDelete(id)

        if(deletedStaff) return NextResponse.json({ message: 'Staff deleted Successfully' }, { status: 200 })
        return NextResponse.json({ message: 'Staff not deleted' }, { status: 404 }) 
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}