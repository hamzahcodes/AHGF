import Customer from "@/models/Customer";
import { connectToDB } from "@/utils/database";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import Supplier from "@/models/Supplier";
import Request from "@models/Request";


export const GET = async (req, res) => {
    try {
        const session = await getServerSession(options);

        if (!session) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        console.log(session);
        const userID = session.user.id;
        if(!userID) return NextResponse.json({ 'error': "unauthorized"}, { status: 401 })

        await connectToDB();

        let counter = await Request.findOne();
        if(!counter) counter = await Request.create({})
        counter.getRequestCalls++;
        await counter.save()

        let customerSupplierArray = []

        const customers = await Customer.find({ user_id: userID }, 'basic_details.username');
        customerSupplierArray.push(customers)

        const suppliers = await Supplier.find({ user_id: userID }, 'supplierName')
        customerSupplierArray.push(suppliers)

        return NextResponse.json({ message: customerSupplierArray }, { status: 200 })


    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}