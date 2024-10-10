import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true,
        minlength: [6, 'Password length must be at least 6 characters'],
    },
    type:{
        type:String,
        enum: ['Renter','Client','Admin'],
        required:true,
    },
    address:{
        type:String,
    },
    profile:{
        type:String,
    },
    contact:{
        type:Number,
        minlength: [10, 'Invalid contact number'],
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    pincode:{
        type:String
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})



userSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function (password){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
        return jwt.sign(
            {
                _id:this._id,
                email:this.email,
                name:this.name,
                type:this.type
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
        )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User= mongoose.model('User',userSchema);