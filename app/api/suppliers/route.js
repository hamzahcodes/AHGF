import Supplier from "@/models/Supplier"
import { connectToDB } from "@/utils/database"
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('supplierID') 

    try {
        await connectToDB();
        
        if(id) {
            const supplier = await Supplier.findById(id)
            return NextResponse.json({ message: supplier }, { status: 200 })
        } else {
            const suppliers = await Supplier.find({})
            return NextResponse.json({ message: suppliers }, { status: 200 })
        }
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const POST = async (req, res) => {
    const { supplierName, supplierPhone, financialTransactions } = await req.json()
    console.log(financialTransactions);
    try {
        await connectToDB()
        const newSupplier = new Supplier({
            supplierName: supplierName,
            supplierPhone: supplierPhone,
            financialTransactions: [{
                payment: financialTransactions.payment,
                paymentDate: financialTransactions.paymentDate,
                balance: financialTransactions.balance
            }]
        })
        const createdSupplier = await Supplier.create(newSupplier)
        return NextResponse.json({ message: createdSupplier }, { status: 201 })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const PUT = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('supplierID') 
    
    const { financialTransactions } = await req.json()

    try {
        await connectToDB()

        const updatedSupplier = await Supplier.findOneAndUpdate(
            { _id: id },
            { $push: { financialTransactions: financialTransactions}},
            { new: true }
        )
        if(updatedSupplier) return NextResponse.json({ message: updatedSupplier}, { status: 200})
        return NextResponse.json({ message: "Failed to Add Transcation"}, { status: 404 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const DELETE = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('supplierID') 

    try {
        await connectToDB()

        const deletedSupplier = await Supplier.findByIdAndDelete(id)

        if(deletedSupplier) return NextResponse.json({ message: 'Supplier deleted Successfully' }, { status: 200 })
        return NextResponse.json({ message: 'Supplier not deleted' }, { status: 404 }) 
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}