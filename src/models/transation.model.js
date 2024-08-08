import mongoose, { Schema } from "mongoose";

const transactionSchema  = new Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['deposit', 'withdraw'], required: true },
  date: { type: Date, default: Date.now }
  

} , {timestamps: true , versionKey: false})

export const transactionModel = mongoose.model('transaction', transactionSchema)