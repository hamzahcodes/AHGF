import { model, models, Schema } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required'],
        unique: [true, 'Phone number is already taken']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
})

const User = models.User || new model('User', userSchema)

export default User