import { catchError } from "./asyncHandlerError.js"
import {userModel} from "../models/user.model.js"
import jwt from "jsonwebtoken"
export const auth = () => {
    return catchError(async (req, res, next) => {

        const { token } = req.headers
        if (!token) {
            return res.status(400).json({ msg: "token not exist" })
        }
       
        const decoded = jwt.verify(token, process.env.signatureKey)
        if (!decoded?.email) {
            return res.status(400).json({ msg: "invalid token payload" })
        }
        const user = await userModel.findOne({ username: decoded.username })
        if (!user) {
            return res.status(409).json({ msg: "user not exist" })
        }
    
        req.user = user
        next()

    })

}




/*
import { catchError } from "./asyncHandlerError.js"


export const auth = () => {
    return catchError(async (req, res, next) => {

        const { token } = req.headers
        if (!token) {
            return res.status(400).json({ msg: "token not exist" })
        }
        if (!token.startsWith("ahmed__")) {
            return res.status(400).json({ msg: "inValid bearer key" })
        }
        const newToken = token.split("ahmed__")[1]
        if (!newToken) {
            return res.status(400).json({ msg: "invalid token" })
        }
        const decoded = jwt.verify(newToken, process.env.signatureToken)
        if (!decoded?.email) {
            return res.status(400).json({ msg: "invalid token payload" })
        }
        const user = await userModel.findOne({ email: decoded.email })
        if (!user) {
            return res.status(409).json({ msg: "user not exist" })
        }
     
        if (parseInt(user.passwordChangedAt.getTime() / 1000) > decoded.iat) {
            return res.status(400).json({ msg: "password changed please login again" })
        }

        req.user = user
        next()

    })

}

*/
