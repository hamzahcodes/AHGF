import Supplier from "@/models/Supplier"
import Stock from "@/models/Stock"
import { connectToDB } from "@/utils/database"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('supplierID')
    console.log(id);
    try {
        await connectToDB();

        if(id) {
            const myOwnStock = await Stock.find({ supplier: id })
            const purchasedStock = await Stock.find({ supplier: id })
            
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
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('supplierID')

    const { name, quantity, isPurchased } = await req.json()
    // first check whether the ID passed even belongs to a supplier or not
    try {
        const supplier = await Supplier.findById(id)

        if(!supplier) return NextResponse.json({ message: 'No such Supplier exists.'}, { status: 404 })

        const newStock = new Stock({
            name: name,
            quantity: quantity,
            isPurchased: isPurchased,
            supplier: id
        })

        const createdStock = await Stock.create(newStock)
        return NextResponse.json({ message: createdStock }, { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}


export const PUT = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const stockID = searchParams.get('stockID')   

    const { name, quantity } = await req.json()
    try {
        await connectToDB()
        const requiredStock = await Stock.findById(stockID)
        
        if(name != undefined) requiredStock.name = name
        if(quantity != undefined) requiredStock.quantity = quantity

        const updatedStock = await requiredStock.save()
        return NextResponse.json({ message: updatedStock }, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export const DELETE = async (req, res) => {
    const { searchParams } = new URL(req.url)
    const stockID = searchParams.get('stockID')

    try {
        await connectToDB()

        const deletedStock = await Stock.findByIdAndDelete(stockID)

        if(deletedStock) return NextResponse.json({ message: 'Stock Deleted Successfully'}, { status: 200 })
        return NextResponse.json({ message: 'Stock failed to delete' }, { status: 404 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}