import mongoose, { Schema } from "mongoose";

const accountSchema  = new Schema({
    username: { type: String, required: true, unique: true },
  password: { type: String, required: true }

  

} , {timestamps: true , versionKey: false})

export const Model = mongoose.model('user', accountSchema)