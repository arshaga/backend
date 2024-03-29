import loginModel from "../models/loginM.js"
import { createError } from "./error.js"
import { decrypt } from "./crypto.js"


export const checkToken = async(req,res,next)=>{
    try{
        console.log(req.cookies)
        const token = req.cookies.session
        if(!token) 
        return next(createError(400,"you are not logged in"))
        
        const tokenData = await decrypt(token)

        if(!tokenData) 
            return next(createError(400,"Token is not valid"))
        
        req.user = tokenData 
        next()
        
    }catch(err){
        console.log(err)
        next(createError(400,'invalid token'))
    }
}

export const checkUser  = async(req,res,next)=>{
    checkToken(req,res,async()=>{
        const doc = await loginModel.findById(req,user,id)
        if(doc.auth.user)
        next()
    else
    {next(createError(400,"you are not autherized"))}
    })
}