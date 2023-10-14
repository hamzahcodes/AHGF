import { Schema, model, models } from "mongoose"

const staffSchema = new Schema({
    name: String,
    phone: Number,
    salary: Number
})

const Staff = models.Staff || new model("Staff", staffSchema)

export default Staff