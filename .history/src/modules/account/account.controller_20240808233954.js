import { catchError } from "../../middlewares/asyncHandlerError.js"
import { accountModel } from "../../models/account.model.js"
const createAccount = catchError(async (req , res ) =>{
    
    const userId = req.user._id;

    const existingAccount = await accountModel.findOne({ userId });
    if (existingAccount) {
      return res.status(400).json({ msg: 'Account already exists.' });
    }

    const newAccount = new accountModel({
        userId,
        balance: 0
    });
    await newAccount.save();
    res.status(201).json({message :'Account created successfully' , newAccount })
})

const deposit = catchError(async (req , res ) =>{
    const userId = req.user._id; 
    const { amount } = req.body; 
  
    if (amount <= 0) {
      return res.status(400).json({ msg: 'Deposit amount must be greater than zero.' });
    }
  
    const account = await Account.findOne({ userId });
    if (!account) {
      return res.status(404).json({ msg: 'Account not found.' });
    }
  
    // Update the account balance
    account.balance += amount;
    await account.save();
   
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