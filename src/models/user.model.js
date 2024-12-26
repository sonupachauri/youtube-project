import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
    {
        watchHistory:{
            type:Schema.Types.ObjectId,
            ref:"Video",
        },
        username:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            index:true,
            Trim:true
        },
        email:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            index:true,
        },
        fullName:{
            type:String,
            required: true,
            trim:true,
            index:true
        },
        avtar:{
            type:String, // cloudinary url
            required: true
        },
        coverImage:{
            type:String, // cloudinary url
        },
        password:{
            type:String,
            required: [true, "Password is required"],
        },
        refreshToken:{
            type:String,
        },
    },{timestamps:true}
)

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 8);
    next();
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:email,
            username:username,
            fullName:fullName,
        }, process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: process.env.ACCESS_TOKEN_ENPIRY}
    );
}

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:email,
            username:username,
            fullName:fullName,
        }, process.env.REFRESH_TOKEN_SECRET, 
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    );
}

export const User = mongoose.model("User", UserSchema);