import { Router } from "express";
import * as AC from "./account.controller.js"

export const accountRouter = Router()

accountRouter.post('/signup' , AC.signUP)

userRouter.post('/signin' , UC.signIn)
