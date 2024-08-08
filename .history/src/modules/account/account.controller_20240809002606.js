import { catchError } from "../../middlewares/asyncHandlerError.js"
import { accountModel } from "../../models/account.model.js"
import { transactionModel } from "../../models/transation.model.js";
const createAccount = catchError(async (req , res , next) =>{
    
    const userId = req.user._id;

    const existingAccount = await accountModel.findOne({ userId });
    if (existingAccount) {
      return next(new a('Account already exists.' , 400)) 
    }

    const newAccount = new accountModel({
        userId,
        balance: 0
    });
    await newAccount.save();
    res.status(201).json({message :'Account created successfully' , newAccount })

})


const deposit = catchError(async (req, res, next) => {
    const userId = req.user._id;
    const { amount } = req.body;
  
    if (amount <= 0) return next(new AppError('Deposit amount must be greater than zero.', 400));
  
    const account = await accountModel.findOne({ userId });
    if (!account) return res.status(404).json({ msg: 'Account not found.' });
  
    account.balance += amount;
    await account.save();
  
    const transaction = new transactionModel({
      accountId: account._id,
      amount,
      type: 'deposit',
    });
    await transaction.save();
  
    res.status(200).json({ msg: 'Deposit successful.', balance: account.balance });
  });

  const withdraw = catchError(async (req, res, next) => {
    const userId = req.user._id;
    const { amount } = req.body;
  
    if (amount <= 0) return next(new AppError('Withdrawal amount must be greater than zero.', 400));
  
    const account = await Account.findOne({ userId });
    if (!account) return res.status(404).json({ msg: 'Account not found.' });
  
    if (account.balance < amount) return next(new AppError('Insufficient balance.', 400));
  
    account.balance -= amount;
    await account.save();
  
    const transaction = new transactionModel({
      accountId: account._id,
      amount,
      type: 'withdraw',
    });
    await transaction.save();
  
    res.status(200).json({ msg: 'Withdrawal successful.', balance: account.balance });
  });
  const balance = catchError(async (req, res, next) => {
    const userId = req.user._id;
  
    const account = await accountModel.findOne({ userId });
    if (!account) return res.status(404).json({ msg: 'Account not found.' });
  
    res.status(200).json({ balance: account.balance });
  });

  
  const transactions = catchError(async (req, res, next) => {
    const userId = req.user._id;
  
    const account = await accountModel.findOne({ userId });
    if (!account) return res.status(404).json({ msg: 'Account not found.' });
  
    const transactions = await transactionModel.find({ accountId: account._id });
  
    res.status(200).json({ transactions });
  });

  
  export {
    createAccount , deposit , withdraw , balance , transactions
  }