import express  from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import formR from './routes/formR.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongodb")
    
    }catch(err){
        console.log(err)
    } 
}
app.use(cors({credentials:true, origin: ["*", "http://localhost:3000"
]}))
app.use(express.json())
app.use(cookieParser())

app.use("/form",formR)

app.use((err,req,res,next)=>{
    const errMessage = err.message||"error from backend"
    const errStatus = err.status  || 500

    res.status(errStatus).json({
        success : false,
        stack :err.stack,
        message : errMessage
    })
})


app.listen(8990,()=>{
    connect()
    console.log("connected to backend")

})