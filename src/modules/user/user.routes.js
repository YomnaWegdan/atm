import { Router } from "express";
import * as UC from "./user.controller.js"

export const userRouter = Router()

userRouter.post('/signup' , UC.signUP)

userRouter.post('/signin' , UC.signIn)
