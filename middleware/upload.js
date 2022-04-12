const fs = require('fs')
const ErrorResponse = require('./../utils/ErrorResponse')

const upload = (req,res,next) => {
    if(req.file){
        let fileName = req.file.filename
        if(req.file.size > 20000000){
            fs.unlink(process.env.UPLOAD_PATH_POST+fileName,()=>(console.log("removed: ",fileName)))
            return next(new ErrorResponse("file size too large",404))
        } 
        if(!['image/jpeg','image/png','image/jpg'].includes(req.file.mimetype)){
            fs.unlink(process.env.UPLOAD_PATH_POST+fileName,()=>(console.log("removed: ",fileName)))
            return next(new ErrorResponse("allowed only jpeg, png, jpg file.",404))
        } 
    }
    return next()
}

module.exports = upload;