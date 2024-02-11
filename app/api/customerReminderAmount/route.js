import Customer from "@/models/Customer";
import { connectToDB } from "@/utils/database";
import { NextResponse, NextRequest } from "next/server";
import Request from "@models/Request";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const GET = async (req, res) => {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("custID");
        const uid = searchParams.get("userID");

        console.log("user ID", uid, "at getReminder AMount");

        let counter = await Request.findOne();
        if(!counter) counter = await Request.create({})
        counter.getRequestCalls++;
        await counter.save()

        if (id && uid) {
            const reminder = await Customer.find({ _id: id, user_id: uid }).select('reminderAmount');
            return NextResponse.json({ message: reminder }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Both user ID and customer ID are required!!' }, { status: 200 });   
        }
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export const PUT = async (req, res) => {
    try {
        const { reminder } = await req.json()

        const session = await getServerSession(options);
        if (!session) {
          return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        const userID = session.user.id;

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("custID");

        // check before DB gets involved
        if (!id) return NextResponse.json({ message: "ID required to delete!!" }, { status: 404 });

        await connectToDB();

        let counter = await Request.findOne();
        if(!counter) counter = await Request.create({})
        counter.postRequestCalls++;
        await counter.save();

        const filter = { _id: id, user_id: userID };
        const update = { reminderAmount: reminder };
        const updatedReminderAmount = await Customer.findOneAndUpdate(filter, update, { new: true });

        if (updatedReminderAmount) {
            console.log("In reminder amount" + updatedReminderAmount);
            return NextResponse.json({ message: updatedReminderAmount }, { status: 200 });
        }
            return NextResponse.json( { message: "Reminder Amount not updated" }, { status: 404 });

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}