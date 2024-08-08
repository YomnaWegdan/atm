import mongoose, { Schema } from "mongoose";

const transactionSchema  = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 }
  

} , {timestamps: true , versionKey: false})

export const accountModel = mongoose.model('user', accountSchema)