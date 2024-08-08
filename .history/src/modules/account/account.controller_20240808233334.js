import { userModel } from "../../models/user.model.js"
import { appError } from "../../utilities/appError.js"
import jwt from 'jsonwebtoken'
import { compareSync, hashSync } from "bcrypt"
import { catchError } from "../../middlewares/asyncHandlerError.js"
const createAccount = catchError(async (req , res ) =>{
    


 
  
})


// const signIn = catchError(async (req , res , next) =>{
//     const {username} = req.body;
//     const user =await userModel.findOne({username:username})
//     if(!user) return next(new appError('user not found' , 404)) 

//     if(!compareSync(password,user.password)) return next(new appError('invalid password' , 404))

//      const token = jwt.sign({ id: user._id }, process.env.signatureKey);

//     res.status(200).json({message :'success' , token })
// })
export {
    createAccount 
}