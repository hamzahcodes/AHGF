import Customer from "@/models/Customer"
import { connectToDB } from "@/utils/database"
import { NextResponse, NextRequest } from "next/server";

// to get all customers meant for customers page
// also when particular customer is clicked then its details api is added
export const GET = async (request, res) => {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('custID')

        await connectToDB();
        if(!id) {
            const customers = await Customer.find({})
            return NextResponse.json({ message: customers }, { status: 200 })
        } else {
            console.log(id);
            const customer = await Customer.findById(id)
            return NextResponse.json({ message: customer }, { status: 200 })
        }

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

// create customer 
export const POST = async (req, res) => {
    // accepting request in the form of JSON only
    // console.log(req);
    const { basic_details, financial_details, goat_details } = await req.json()
    console.log('Basic_details', basic_details);
    console.log('Finance_details', financial_details);
    console.log('Goat_details', goat_details);
    try {
        await connectToDB()

        const newCustomer = new Customer({
            basic_details: {
                username: basic_details.username,
                phone_no: basic_details.phone_no
            },
            financial_details: [{
                amount: financial_details.amount,
                pay_date: financial_details.pay_date,
                balance: financial_details.balance,
            }],
            goat_details: [{
                goat_type: goat_details.goat_type,
                palaai_type: goat_details.palaai_type,
                on_boarding: goat_details.on_boarding,
                off_boarding: goat_details.off_boarding,
            }]
        })

        const createdCustomer = await Customer.create(newCustomer)

        return NextResponse.json({ message: createdCustomer }, { status: 201 })

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

// 2 functionalities required:
//  a. update details of customer (not sure we keep this)
//  b. append another goat_detail OR financial details
export const PUT = async (req, res) => {
    // accepting request in the form of JSON only
    const { basic_details, financial_details, goat_details } = await req.json()

    try {
         // to fetch unique ID of customers and update them
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('custID')

        // check before DB gets involved
        if(!id) return NextResponse.json({ message: 'ID required to delete!!' }, { status: 404 })

        await connectToDB()

        // appending only financial details array to existing customer
        if(financial_details && !basic_details && !goat_details) {
            const filter = { _id: id }
            const update = { $push: { financial_details: financial_details }}
            const updatedFinance = await Customer.findOneAndUpdate( filter, update, { new: true})

            if(updatedFinance) return NextResponse.json({ message: updatedFinance }, { status: 200 })
            return NextResponse.json({ message: 'Finance details not updated' }, { status: 404 }) 
        }

        // appending only goat details array to existing customer
        if(goat_details && !basic_details && !financial_details) {
            const filter = { _id: id }
            const update = { $push: { goat_details: goat_details }}
            const updatedGoatDetail = await Customer.findOneAndUpdate( filter, update, { new: true})

            if(updatedGoatDetail) return NextResponse.json({ message: updatedGoatDetail }, { status: 200 })
            return NextResponse.json({ message: 'Finance details not updated' }, { status: 404 }) 
        }


        // in doubt whether we even require this API as we will deal with addition of goat or financial details only
        const updateCustomer = ({
            basic_details: {
                username: basic_details.username,
                phone_no: basic_details.phone_no
            },
            financial_details: [{
                amount: financial_details.amount,
                pay_date: financial_details.pay_date,
                balance: financial_details.balance,
            }],
            goat_details: [{
                goat_type: goat_details.goat_type,
                palaai_type: goat_details.palaai_type,
                on_boarding: goat_details.on_boarding,
                off_boarding: goat_details.off_boarding,
            }]
        })

        const updated = await Customer.findByIdAndUpdate(id, updateCustomer)

        if(updated) return NextResponse.json({ message: updateCustomer }, { status: 200 })
        return NextResponse.json({ message: 'Failed to update' }, { status: 404 })

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

// delete particular customer
export const DELETE = async (req, res) => {
    try {
        // to fetch unique ID of customers and delete them
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('custID')

        // check before DB gets involved
        if(!id) return NextResponse.json({ message: 'ID required to delete!!' }, { status: 404 })

        const deleted = await Customer.findByIdAndDelete(id);

        if(deleted) return NextResponse.json({ message: 'Customer deleted successfully' }, { status: 200 })
        return NextResponse.json({ message: 'Failed to delete customer' }, { status: 404 })

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 505 })
    }
}