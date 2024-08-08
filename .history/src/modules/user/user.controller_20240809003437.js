import { userModel } from "../../models/user.model.js"
import { appError } from "../../utilities/appError.js"
import jwt from 'jsonwebtoken'
import { compareSync, hashSync } from "bcrypt"
import { catchError } from "../../middlewares/asyncHandlerError.js"
const signUP = catchError(async (req , res , next) =>{


    const { username } = req.body;

    const user = await userModel.findOne({username})
    if(user) return next(new appError('user already exists') , 409) 

        req.body.password = hashSync(req.body.password , 10)
        const users = await userModel.create(req.body) 
        res.status(201).json({message :'success' , users }) 

})


const signIn = catchError(async (req , res , next) =>{
    const {username , password} = req.body;
    const user =await userModel.findOne({username})
    if(!user) return next(new appError('user not found' , 404)) 

    if(!compareSync(password,user.password)) return next(new appError('invalid password' , 404))

        const token = jwt.sign({ username: user.username, id: user._id }, process.env.signatureKey, { expiresIn: "1d" });

    res.status(200).json({message :'success' , token })
})
export {
    signUP , signIn
}