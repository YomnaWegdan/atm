import { Router } from "express";
import * as AC from "./account.controller.js"

export const accountRouter = Router()

accountRouter.post('/' , AC.createAccount)
accountRouter.post('/deposit' , AC.deposit)
accountRouter.post('/withdraw' , AC.withdraw)
accountRouter.get('/balance' , AC.balance)
accountRouter.post('/transactions' , AC.transactions)



