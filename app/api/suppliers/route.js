import Supplier from "@/models/Supplier"
import { connectToDB } from "@/utils/database"
import { getDataFromToken } from "@helper/getDataFromToken";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('supplierID') 
    const userID = await getDataFromToken(req)
    
    try {
        await connectToDB();
        
        if(id) {
            const supplier = await Supplier.find({ user_id: userID, _id: id })
            return NextResponse.json({ message: supplier }, { status: 200 })
        } else {
            const suppliers = await Supplier.find({ user_id: userID })
            return NextResponse.json({ message: suppliers }, { status: 200 })
        }

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const POST = async (req, res) => {
    const { supplierName, supplierPhone } = await req.json()
    const userID = await getDataFromToken(req)

    try {

        await connectToDB()
        const newSupplier = new Supplier({
            supplierName: supplierName,
            supplierPhone: supplierPhone,
            user_id: userID
        })

        const createdSupplier = await Supplier.create(newSupplier)
        return NextResponse.json({ message: createdSupplier }, { status: 201 })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const PUT = async (req, res) => {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('supplierID') 
        if(!id) return NextResponse.json({ message: 'Supplier ID required to update!!' }, { status: 404 })
        
        const { financialTransactions, stockDetails } = await req.json()
    
        const userID = await getDataFromToken(req)

        await connectToDB()


        const updatedSupplier = (financialTransactions) 
        ? 
        await Supplier.findOneAndUpdate(
            { _id: id, user_id: userID },
            { $push: { financialTransactions: financialTransactions}},
            { new: true }
        )
        :
        await Supplier.findOneAndUpdate(
            { _id: id, user_id: userID },
            { $push: { stockDetails: stockDetails}},
            { new: true }
        )

        if(updatedSupplier) return NextResponse.json({ message: updatedSupplier}, { status: 200})
        return NextResponse.json({ message: "Failed to Add Transcation"}, { status: 404 })

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

// export const DELETE = async (req, res) => {
//     const { searchParams } = new URL(req.url)
//     const id = searchParams.get('supplierID') 
//     const userID = await getDataFromToken(req)

//     try {
//         await connectToDB()

//         const deletedSupplier = await Supplier.findOneAndUpdate(
//             { _id: id, user_id: userID },
//             { $pull: { stockDetails: stockDetails}},
//             { new: true }
//         )

//         if(deletedSupplier) return NextResponse.json({ message: 'Supplier deleted Successfully' }, { status: 200 })
//         return NextResponse.json({ message: 'Supplier not deleted' }, { status: 404 }) 
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ message: error.message }, { status: 500 })
//     }
// }