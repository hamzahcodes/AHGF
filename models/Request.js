import { Schema, model, models } from 'mongoose'

const requestSchema = new Schema({
    getRequestCalls: {
        type: Number,
        default: 0
    },
    postRequestCalls: {
        type: Number,
        default: 0  
    },
    putRequestCalls: {
        type: Number,
        default: 0
    }
})

const Request = models.Request || new model('Request', requestSchema)

export default Request