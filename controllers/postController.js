const Post = require("../models/Posts")
const ErrorResponse = require('../utils/ErrorResponse');
const mongoose = require('mongoose')

exports.createPost = async(req,res,next) => {

    const {postCategory, postTitle, postContent, date, location} = req.body;

    let postCover = undefined;
    if(req.file) postCover = req.file.filename
        
    try{
        
        const user = mongoose.Types.ObjectId(req.body.user);
        
        const post = await Post.create({
            postCategory, postTitle, postCover, postContent, date, location, user
        })
        return res.status(201).json({
            success: true,
            post
        })
    }catch(error){
        return next(error);
    }

}

exports.updatePost = async(req,res,next) => {
    const id = req.params.postId

    let postCover = undefined;
    if(req.file) postCover = req.file.filename

    if(postCover) req.body.postCover = postCover;
    try{
        const post =  await Post.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(id)
        },{... req.body})
                 
        if(!post) return next(new ErrorResponse("Invalid Post Id"))
        
        // for(let [key,value] of Object.entries(req.body)){
        //     post[key] = value;  
        // }
        // await post.save()

        return res.status(200).json(post)
    }catch(error){
        return next(error)
    }
            
}

exports.removePost = async(req,res,next) => {
    const id = req.params.postId

    try{
        const post =  await Post.findOneAndDelete({
            _id: mongoose.Types.ObjectId(id)
        })
        
        if(!post) return next(new ErrorResponse("Invalid Post Id"))
            
        return res.status(200).json({success:true, post})
    }catch(error){
        return next(error)
    }
            
}

exports.getPost = async(req,res,next) => {
    const id = req.params.postId

    try{
        const post =  await Post.findOne({
            _id: mongoose.Types.ObjectId(id)
        })
        
        if(!post) return next(new ErrorResponse("Invalid Post Id"))
            
        return res.status(200).json({...post._doc, postCover: post.postCover})
    }catch(error){
        return next(error)
    }
}

