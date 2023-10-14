import { model, models, Schema } from "mongoose"

const stockSchema = new Schema({
    name: String,
    quantity: Number,
    isPurchased: Boolean,
    supplier: { 
        type: Schema.Types.ObjectId,
        ref: 'Supplier' 
    }, 
})

const Stock = models.Stock || new model('Stock', stockSchema)

export default Stock