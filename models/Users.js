const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true,"please provide firstName"]
    },
    lastName : {
        type: String,
        required: [true,"please provide lastName"]
    },
    profile:{
        type:String,
        required: false,
        default: "noUserProfileImage.png",
        get: val => (process.env.UPLOAD_PATH_USER+val),
    },
    username : {
        type:String,
        required: [false,"Please Provide a UserName"],
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please provide a valid E-mail"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false, 
    },
    password_hash: String,
    hash_created_at: Date 
});

UserSchema.pre("save" , async function(next){
    if(!this.isModified('password')) next();

    // console.log("pass---",this.password)
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password,this.password);
};

UserSchema.methods.getJWT = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    });
};

UserSchema.methods.getResetPasswordHash = function(){
    const hash = crypto.randomBytes(21).toString('hex');
    this.password_hash = crypto.createHash('sha256').update(hash).digest('hex');
    this.hash_created_at = Date.now() + eval(process.env.HASH_EXPIRE);
    return hash;
};



const User = mongoose.model('User', UserSchema);

module.exports = User;