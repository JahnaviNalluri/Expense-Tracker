const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    phoneno:{
        type:String,
        required:true,
        unique:true,
         match: [/^\d{10,15}$/, "Invalid phone number"],
    },
    
}, {timestamps:true});

module.exports=mongoose.model("User",userSchema);