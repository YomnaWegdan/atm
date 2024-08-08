import { Router } from "express";
import * as AC from "./account.controller.js"
import { auth } from "../../middlewares/auth.js";

export const accountRouter = Router()

accountRouter.post('/' , auth(), AC.createAccount)
accountRouter.post('/deposit', auth() , AC.deposit)
accountRouter.post('/withdraw' , auth() , AC.withdraw)
accountRouter.get('/balance', auth , AC.balance)
accountRouter.get('/transactions' , AC.transactions)



