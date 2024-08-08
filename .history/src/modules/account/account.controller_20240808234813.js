import { catchError } from "../../middlewares/asyncHandlerError.js"
import { accountModel } from "../../models/account.model.js"
const createAccount = catchError(async (req , res , next) =>{
    
    const userId = req.user._id;

    const existingAccount = await accountModel.findOne({ userId });
    if (existingAccount) {
      return next(new appError('Account already exists.' , 400)) 
    }

    const newAccount = new accountModel({
        userId,
        balance: 0
    });
    await newAccount.save();
    res.status(201).json({message :'Account created successfully' , newAccount })

})

const deposit = catchError(async (req , res  , next) =>{
    const userId = req.user._id; 
    const { amount } = req.body; 
  
    if (amount <= 0) return next(new appError('Deposit amount must be greater than zero.' , 400)) 
    
  
    const account = await accountModel.findOne({ userId });
    if (!account)  return res.status(404).json({ msg: 'Account not found.' });
    
  
    account.balance += amount;
    await account.save();
   
})

const withdraw = catchError(async (req , res  , next) =>{
    const userId = req.user._id; 
    const { amount } = req.body; 
  
    if (amount <= 0) return next(new appError('Withdrawal amount must be greater than zero.' , 400)) 
    
  
    const account = await accountModel.findOne({ userId });
    if (!account)  return res.status(404).json({ msg: 'Account not found.' });
    
    if (account.balance < amount) return next(new appError('Insufficient balance.' , 400)) 
    
  
    account.balance -= amount;
    await account.save();
   
})

const  withdraw = catchError(async (req , res  , next) =>{
    = catchError(async (req , res  , next) =>{

})

const withdraw = catchError(async (req , res  , next) =>{
})

export {
    createAccount , deposit
}