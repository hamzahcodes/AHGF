import Supplier from "@/models/Supplier"
import Stock from "@/models/Stock"
import { connectToDB } from "@/utils/database"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('supplierID')

    try {
        await connectToDB();

        if(id) {
            const myOwnStock = await Stock.find({ supplier: id, isPurchased: false })
            const purchasedStock = await Stock.find({ supplier: id, isPurchased: true })
            
            if(myOwnStock) return NextResponse.json({ message: myOwnStock }, { status : 200} )
            else if(purchasedStock) return NextResponse.json({ message: purchasedStock }, { status : 200} )
        } else {
            const allStocks = await Stock.find({})
            return NextResponse.json({ message: allStocks}, { status : 200})
        }   
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const POST = async (req, res) => {
    
}