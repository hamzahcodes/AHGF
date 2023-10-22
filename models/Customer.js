import { Schema, model, models } from 'mongoose'

const customerSchema = new Schema({
    basic_details: {
        username: {
            type: String,
            required: [true, 'Username is required!']
        },
        phone_no: {
            type: Number,
            required: [true, 'Phone no. is required']
        },
    },

    // array of financial_details as there are multiple of them
    financial_details: [{
        amount: Number,
        pay_date: {
            type: Date,
            default: () => Date.now()
        }
    }],

    // a single customer can have multiple goats
    goat_details: [{
        goat_type: String,
        palaai_type: String,
        total_amount: Number,
        on_boarding: {
            type: Date,
            default: () => Date.now()
        },
        off_boarding: Date,
    }]
})

const Customer = models.Customer || new model('Customer', customerSchema)

export default Customer