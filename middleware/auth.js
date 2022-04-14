const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const ErrorResponse = require('../utils/ErrorResponse');

exports.authorized = async(req,res,next) => {
    let token;

    if(process.env.DEV_MODE) {
        return next()
    } 
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return next(new ErrorResponse("Invalid Token - Unauthorized Access",401));
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if(!user){
            return next(new ErrorResponse('No user found',404));
        }

        req.user = user;

        return next();

    }catch(error){

        return next(error);
    }

}

