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
    financialTransactions: [{
        payment: Number,
        paymentDate: {
            type: Date,
            default: () => Date.now(),
        },
        balance: Number
    }]
})

const Supplier = models.Supplier || new model('Supplier', supplierSchema)

export default Supplier