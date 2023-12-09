import { connectToDB } from "@/utils/database"
import Staff from "@/models/Staff"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options.js";

export const GET = async (req, res) => {

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('staffID') 
    try {

        const session = await getServerSession(options);

        if(!session) {
            return NextResponse.json({ 'error': "unauthorized"}, { status: 401 })
        }
        const userID = session.user.id

        await connectToDB();

        if(id) {
            const oneStaff = await Staff.find({ _id: id, user_id: userID })
            return NextResponse.json({ message: oneStaff }, { status: 200 })
        } else {
            const staff = await Staff.find({ user_id: userID })
            return NextResponse.json({ message: staff }, { status: 200 })
        }
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const POST = async (req, res) => {
    const { name, phone, salary } = await req.json()
    try {
        const session = await getServerSession(options);

        if(!session) {
            return NextResponse.json({ 'error': "unauthorized"}, { status: 401 })
        }
        const userID = session.user.id

        await connectToDB()

        const newStaff = new Staff({
            name: name,
            phone: phone,
            salary: salary,
            user_id: userID
        })
        const createdStaff = await Staff.create(newStaff)
        return NextResponse.json({ message: createdStaff }, { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const PUT = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('staffID')

    const { name, phone, salary } = await req.json()

    try {
        const session = await getServerSession(options);

        if(!session) {
            return NextResponse.json({ 'error': "unauthorized"}, { status: 401 })
        }
        const userID = session.user.id
        await connectToDB()

        const updatedStaff = await Staff.findByIdAndUpdate(id, {
            // name: (name != null && name.length != 0) && name,
            phone: (phone != null && phone.length != 0) && phone,
            salary: (salary != null && salary.length != 0) && salary,
            user_id: userID
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
        const session = await getServerSession(options);

        if(!session) {
            return NextResponse.json({ 'error': "unauthorized"}, { status: 401 })
        }
        const userID = session.user.id
        await connectToDB()

        const deletedStaff = await Staff.findByIdAndDelete(id)

        if(deletedStaff) return NextResponse.json({ message: 'Staff deleted Successfully' }, { status: 200 })
        return NextResponse.json({ message: 'Staff not deleted' }, { status: 404 }) 
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}