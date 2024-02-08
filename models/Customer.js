import { Schema, model, models } from 'mongoose'

const customerSchema = new Schema({
  basic_details: {
    username: {
      type: String,
      required: [true, "Username is required!"],
    },
    phone_no: {
      type: Number,
      required: [true, "Phone no. is required"],
    },
  },

  // array of financial_details as there are multiple of them
  financial_details: [
    {
      amount: Number,
      pay_date: {
        type: Date,
        default: () => Date.now(),
      },
      imageFile: {
        type: String,
      },
      remarks: String,
    },
  ],

  // a single customer can have multiple goats
  goat_details: [
    {
      on_boarding: {
        type: Date,
        default: () => Date.now(),
      },
      quantity: Number,
      breed: String,
      gender: String,
      goat_type: String,
      palaai_type: String,
      weight: Number,
      height: Number,
      total_amount: Number,
      off_boarding: {
        type: Date,
        default: () => Date.now(),
      },
    },
  ],

  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  reminderAmount: {
    type: Number,
    default: 0
  }
});

const Customer = models.Customer || new model('Customer', customerSchema)

export default Customer