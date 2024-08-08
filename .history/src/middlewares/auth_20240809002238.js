import { catchError } from "./asyncHandlerError.js"
import {userModel} from "../models/user.model.js"
import jwt from "jsonwebtoken"
<<<<<<<<<<<<<<  ✨ Codeium Command 🌟 >>>>>>>>>>>>>>>>
/**
 * Middleware function to authenticate the user.
 * 
 * @return {Function} - The middleware function.
 */
export const auth = () => {
    return catchError(async (req, res, next) => {
        // Extract the token from the request headers.
        const { token } = req.headers;

        // If the token is not present, return a 400 error.
        if (!token) {
            return res.status(400).json({ msg: "Token not exist" });
        }

        // Verify the token using the signature key.
        const decoded = jwt.verify(token, process.env.signatureKey);

        // If the decoded token does not contain the username, return a 400 error.
        if (!decoded?.username) {
            return res.status(400).json({ msg: "Invalid token payload" });
        }

        // Find the user with the corresponding username.
        const user = await userModel.findOne({ username: decoded.username });

        // If the user does not exist, return a 409 error.
        if (!user) {
            return res.status(409).json({ msg: "User not exist" });
        }

        // Set the authenticated user in the request object.
        req.user = user;

        // Call the next middleware.
        next();
    });
}
export const auth = () => {
    return catchError(async (req, res, next) => {

        const { token } = req.headers
        if (!token) {
            return res.status(400).json({ msg: "token not exist" })
        }
       
        const decoded = jwt.verify(token, process.env.signatureKey)
        if (!decoded?.username) {
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
<<<<<<<  58466baa-358c-4b8a-a738-c91f7d7ca186  >>>>>>>




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
