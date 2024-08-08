import { userModel } from "../../models/user.model.js"
import { appError } from "../../utilities/appError.js"
import jwt from 'jsonwebtoken'
import sendEmail from "../../utilities/email.js"
import { compareSync, hashSync } from "bcrypt"
import { catchError } from "../../middlewares/asyncHandlerError.js"
import { customAlphabet } from "nanoid"
const signUP = catchError(async (req , res , next) =>{

    const {username  , password } = req.body
    const user = await userModel.findOne({username:username , password:password})
    if(user) return next(new appError('user already exists') , 409) 
    req.body.password = hashSync(req.body.password , 10)

    const users = await userModel.create(req.body) 
    // users[0].password = undefined 

    res.status(201).json({message :'success' , users }) 
})


const signIn = catchError(async (req , res , next) =>{
    const {username} = req.body;
    const user =await userModel.findOne({username:username})
    if(!user) return next(new appError('user not found' , 404)) 

    if(!compareSync(password,user.password)) return next(new appError('invalid password' , 404))

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const token = jwt.sign({email} , process.env.signatureKey )
    await userModel.updateOne({email:email.toLowerCase()} , {loggedIn:true})

    
    res.status(200).json({message :'success' , token })
})
export {
    signUP , verifyEmail , refreshToken , forgetPassword , resetPassword , signIn
}