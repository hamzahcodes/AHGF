import { Schema, model, models } from "mongoose"

const staffSchema = new Schema({
    name: String,
    phone: Number,
    salary: Number,
    joiningDate: {
        type: Date,
        default: () => Date.now(),
    },
    user_id: { 
        type: Schema.Types.ObjectId,
        ref: 'User' 
    }, 
})

const Staff = models.Staff || new model("Staff", staffSchema)

export default Staff