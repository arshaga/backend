import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    id:{
        type:String,
        //required:true,
        },
    username:{
        type:String,
        require:true,
        unique:true,
    },
    address:{
        type:String,
        require:true,
    },
    email:{
      type:String,
      require:true,
    },
    password:{
        type:String,
        require:true,
        trim:true,
    },
    confirmpass:{
        type:String,
        require:true,
    },

},{timeStamps:true})

const model = mongoose.model("user",userSchema)
export default model