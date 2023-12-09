import Supplier from "@/models/Supplier"
import { connectToDB } from "@/utils/database"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options.js";

export const GET = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('supplierID')
    console.log(id);
    try {
        const session = await getServerSession(options);

        if(!session) {
            return NextResponse.json({ 'error': "unauthorized"}, { status: 401 })
        }
        const userID = session.user.id
        await connectToDB();

        if(id) {
            const stock = await Supplier.find({ _id: id, user_id: userID }).select("stockDetails").select("supplierName")            
            return NextResponse.json({ message: stock }, { status : 200} )
        } else {
            const stock = await Supplier.find({ user_id: userID }).select("stockDetails").select("supplierName")
            return NextResponse.json({ message: stock}, { status : 200})
        }   

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const POST = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('supplierID')
    const { stockDetails } = await req.json()

    // console.log(userID, "at line 37");
    // console.log(stockDetails);

    try {
        const session = await getServerSession(options);

        if(!session) {
            return NextResponse.json({ 'error': "unauthorized"}, { status: 401 })
        }
        const userID = session.user.id

        // first check whether the ID passed even belongs to a supplier or not
        const supplier = await Supplier.findById(id)

        if(!supplier) return NextResponse.json({ message: 'No such Supplier exists.'}, { status: 404 })

        const newStock = await Supplier.findOneAndUpdate(
            { _id: id, user_id: userID },
            { $push: { stockDetails: stockDetails}},
            { new: true }
        )

        if(newStock) return NextResponse.json({ message: newStock }, { status: 200})
        return NextResponse.json({ message: "Failed to Add new Stock"}, { status: 404 })
    
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}


// export const PUT = async (req, res) => {
//     const { searchParams } = new URL(req.url)
//     const id = searchParams.get('supplierID')   
//     const stockID = searchParams.get("stockID")

//     const userID = await getDataFromToken(req)
//     const { stockDetails } = await req.json()
//     try {
//         await connectToDB()
//         const updatedStock = await Supplier.findOneAndUpdate(
//             { _id: id, user_id: userID, 'stockDetails._id': stockID },
//             { $set: { stockDetails: {
//                 quantity: stockDetails.quantity,
//                 price: stockDetails.price
//             } }},
//             { new: true }
//         )
        
//         // if(name != undefined) requiredStock.name = name
//         // if(quantity != undefined) requiredStock.quantity = quantity

//         // const updatedStock = await requiredStock.save()
//         return NextResponse.json({ message: updatedStock }, { status: 200 })
//     } catch (error) {
//         console.log(error.message);
//         return NextResponse.json({ message: error.message }, { status: 500 })
//     }
// }

// export const DELETE = async (req, res) => {
//     const { searchParams } = new URL(req.url)
//     const stockID = searchParams.get('stockID')

//     try {
//         await connectToDB()

//         const deletedStock = await Stock.findByIdAndDelete(stockID)

//         if(deletedStock) return NextResponse.json({ message: 'Stock Deleted Successfully'}, { status: 200 })
//         return NextResponse.json({ message: 'Stock failed to delete' }, { status: 404 })
//     } catch (error) {
//         console.log(error.message);
//         return NextResponse.json({ message: error.message }, { status: 500 })
//     }
// }