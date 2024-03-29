import employeeModel from '../models/employeeM.js'
import loginModel from '../models/loginM.js'
import bcrypt from "bcrypt";
import { createError } from '../utils/error.js';

export const postEmp = async (req,res,next) =>{
    try{
        const salt = bcrypt.genSalt(10);
        const pass = bcrypt.hashSync(req.body.password, salt);
        const user = employeeModel({
            ...req.body,
            password: pass,
        });
        const login = loginModel({ ...req.body});
        await login.save();
        await user.save();
        res.status(200).json({ message: "emp add successfully",success : true})

    }
    catch(err){
      next(createError(400,err.message));
    }
};