import loginModel from '../models/loginM.js';
import userModel from '../models/userM.js';
import bcrypt from "bcrypt";
import { createError } from '../utils/error.js';

export const postUser = async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const pass = bcrypt.hashSync(req.body.password, salt);
      const user = userModel({
        ...req.body,
        password: pass,
      });
      const login = loginModel({ ...req.body });
      await login.save();
      await user.save();
      res.status(200).json({ message: "user add successfully", success: true });
    } catch (err) {
      console.log("failed")
      next(createError(400, err.message));
    }
  };
  
  export const updateUser = async(req,res,next)=>{
    try{
        if(req.body.password){
            const salt = bcrypt.genSaltSync(10)
            let pass = bcrypt.hashSync(req.body.password,salt)
            req.body.password = pass
        console.log(pass)
        }
        
        await userModel.findByIdAndUpdate(req.user.id,{
            $set:{
                ...req.body,
           },
        })
        await loginModel.findByIdAndUpdate(req.user.id,{
            $set:{
                ...req.body,
           },
        },{new:true})
            res.status(200).json({message:"userUpdate",success:true})

    }catch(err)
    {
        console.log(err)
        next(createError(400,err.message))
    }
}

export const getUser = async(req,res,next)=>{
  try{

      const getUsers = await userModel.findById(req?.user?.id)
      let users = []
      if(getUsers){
      const {password, ...others} = getUsers?._doc
      users = others
      }
      res.status(200).json({success :true , data: users, message:"user list found"})

  }
  catch(err){
      next(createError(500,err.message))
  }

}

export const deleteUser = async(req,res,next)=>{
  try{
      const deleteUser =await userModel.findByIdAndDelete(req.params.id)
      await loginModel.findByIdAndDelete(req.params.id)
      res.status(200).json("User deleted Successfully")

  }catch(err){
      next(createError(500,err.message))
  }
}
