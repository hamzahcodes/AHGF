import { model, models, Schema} from "mongoose"

const supplierSchema = new Schema({
    supplierName: {
        type: String,
        required: [true, 'Supplier name is required']
    },
    supplierPhone: {
        type: Number,
        required: [true, 'Supplier Phone no. is required']
    },
    stockDetails: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    financialTransactions: [{
        payment: Number,
        paymentDate: {
            type: Date,
            default: () => Date.now(),
        },
    }],
    user_id: { 
        type: Schema.Types.ObjectId,
        ref: 'User' 
    }, 
})

const Supplier = models.Supplier || new model('Supplier', supplierSchema)

export default Supplier