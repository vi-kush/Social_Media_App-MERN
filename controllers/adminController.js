const User = require('../models/Users');
const ErrorResponse = require('../utils/ErrorResponse');
const crypto = require('crypto');
const sendMail = require('../utils/sendMail');

exports.signup = async(req,res,next) => {
    const {firstName, lastName, username , email , password} = req.body ;
    
    try{
        const user = await User.create({
            firstName, lastName, username, email, password
        });
        return res.status(201).json({
            success: true, token : user.getJWT() 
        });

    }catch(error){
        return next(error);
    }
}

exports.login = async(req,res,next) => {
    const {email,password} = req.body;

    if(!email || !password) res.status(400).json({
        success: false , error : "please provide email and password"
    })
    try{
        const user = await User.findOne({email}).select('+password');
        
        if(!user){
            return next(new ErrorResponse("invalid credentials",404));
        }
        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            return next(new ErrorResponse("invalid credentials",401));
        }

        // const profile = user.profile;
        return res.status(200).json({
            status: true, token : user.getJWT() 
        });

    }catch(error){
        return next(error);
    }
}

exports.forgetPassword = async(req,res,next) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return next(new ErrorResponse("invalid email",404));
        }

        const token = await user.getResetPasswordHash();
        await user.save()

        const resetURL = `${ req.protocol}://${req.get('host')}/api/auth/resetpassword/${token}`;

        const message = `
            <h3> Password reset request</h3>
            <br>
            <div style="width:100%;display:flex;justify-content:center;align-items:center;">
            <a href="${resetURL}" clicktracking="off" 
                    style="
                        text-decoration:none;
                        border:1px solid red;
                        background:aqua;
                        color: black;
                        opacity: 0.9;
                        font-size: 15px;
                        font-weight:bolder;
                        padding: 10px 15px;
                        margin: 10px;
                        border-radius:10px;
                    "
            > Click To Reset Password </a>
            </div>
            <br>
            <hr> 
            <p> or click link to Reset your password. 
                <a href="${resetURL}" clicktracking="off"> ${resetURL} </a>
                <br>
                <br> 
                <b>Note:  <u>This link will expire after 15 mins.</u></b>
            </p> 
        `;

        try{

            await sendMail({
                to : user.email,
                subject: "Password Reset Request",
                text : message
            });
            // console.log(token)
            return res.status(200).json({success: true, data: "Email sent" });

        }catch(error){

            user.password_hash = undefined;
            user.hash_created_at = undefined;
            await user.save();
            return next(new ErrorResponse('Couldn,t Send Mail',500)); 
        }
    }catch(error){
        return next(error);
    }
}

exports.resetPassword = async(req,res,next) => {
    
    const hash = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    // console.log(hash);
    try{
        const user = await User.findOne({
            password_hash : hash,
            hash_created_at : {$gt : Date.now()}
        });

        if(!user){
            return next(new ErrorResponse('Invalid Token or Expired',400));
        }

        user.password = req.body.password;
        user.password_hash = undefined;
        user.hash_created_at = undefined;
        await user.save();

        return res.status(201).json({
            success: true,
            data: "password Reset Successful"
        });

    }catch(error){
        return next(error);
    }
}

