import mongoose from "mongoose";

const empSchema = mongoose.Schema({
    id:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        trim:true,
    },
    gender:{
        type:String,
        require:true,

    },
    city:{
        type:String,
        require:true,
    },
    salary:{
        type:Number,

    },
},{timeStamps:true}
)
const model =mongoose.model("emp",empSchema)
export default model