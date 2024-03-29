import bcrypt from'bcrypt'
import { createError } from '../utils/error.js'
import { encrypt } from '../utils/crypto.js'
import userModel from '../models/userM.js'

export const login = async ( req, res,next) =>{
    // try{
    //     const checkEmail= await loginModel.findOne({ email: req.body.email})
    //     if(!checkEmail) return next(createError(400,"email dose not exists,pls reg first"))

    //     const checkPass = await bcrypt.compareSync(req.body.password,checkEmail.password)  
    //     if(!checkPass) return next(createError(400,"Wrong password or username!"))
        
    // const text = JSON.stringify({id:checkEmail._id})
    // const token = await encrypt(text) 

    // res.cookie("token",token,{httpOnly:true,
    //     sameSite: 'strict',
    //   path: '/',})
    // res.status(200).json({message:"you are logged",success:true})
    // }catch(err){

    //     next(createError(400,err.message))
    //     }
    try{
        const checkUsername = await userModel.findOne({email:req.body.email})
        console.log(checkUsername)
        if(!checkUsername) {
            return res.status(200).json({message:"you  are not registered",success:false})
        }
        // compare password with hashed password in database
        const checkPass = await bcrypt.compareSync(req.body.password,checkUsername.password)
        
        if (!checkPass)
            return  res.status(400).json("invalid password")
            console.log(checkPass)
        const text =JSON.stringify({id:checkUsername._id})
        const token = await encrypt(text);
        console.log(token)
        // const token =(id:checkUsername._id)
        res.cookie("session",token,{httpOnly:true}).status(200).json({message:"logged in successfully",success:true})
        // console.log(req.cookies)
        }catch(err)
        {console.log(err)
        // res.status(500).json({err:err.message})
        next(createError(400,err.message))
        }
}