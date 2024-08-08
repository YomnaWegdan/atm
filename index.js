import dotenv from "dotenv"
import path from 'path'
dotenv.config()
// dotenv.config({path:path.resolve("/.env")})

import express from 'express'
import { initApp } from './src/initApp.js'

// app.set('case sensitive routing', true)

const app = express()

initApp(app, express)