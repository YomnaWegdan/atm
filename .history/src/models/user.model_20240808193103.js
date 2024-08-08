import mongoose, { Schema } from "mongoose";

const userSchema  = new Schema({
    username: { type: String, required: true, unique: true },
  password: { type: String, required: true }

    code:String,
    passwordChangeAt:Date

} , {timestamps: true , versionKey: false})

export const userModel = mongoose.model('user', userSchema)