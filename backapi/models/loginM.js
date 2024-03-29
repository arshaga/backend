import mongoose from 'mongoose'

const loginSchema = mongoose.Schema({
    id:{
        type:String,
        //required:true,
        },
        username:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            require:true,
          },
        password:{
            type:String,
            required:true,
            
        },
        auth:{
            type:String,
            required:true,
            default:"user"
        },
    },{timestamps:true})

    const model = mongoose.model("login",loginSchema)
    export default model