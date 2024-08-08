import { dbConnection } from '../database/dbConnection.js'
import { globalError } from "./middlewares/asyncHandlerError.js"
import * as routers from './modules/index.routes.js'
import { appError } from './utilities/appError.js'

export const initApp = (app , express)=>{
    const port = 3000
app.use(express.json())

app.use('/' , routers.userRouter)
app.use('/account' ,  routers.accountRouter)





app.use('*' , (req , res , next)=> next(new appError('route not found ${req.originalUrl}'),404) )

app.use( globalError ) 

//handle error outside express
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}