const Like = require('./../models/Likes')
const Comment = require('./../models/Comments')
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
            
        let likes = await post.getLikes();
        let comments = await post.getComments();
        return res.status(200).json({...post._doc, postCover: post.postCover, likes, comments})
    }catch(error){
        return next(error)
    }
}

exports.addComment = async(req,res,next) => {
    const postId = req.params.postId
    const {userId, comment} = req.body
    
    try{
        const userComment = await Comment.create({comment, user: mongoose.Types.ObjectId(userId), post: mongoose.Types.ObjectId(postId)})

        return res.status(200).json({
            success : true,
            comment : userComment
        })
    }catch(error){
        return next(new ErrorResponse(error,404))
    }

}

exports.likePost = async(req,res,next) => {
    const postId = req.params.postId
    const {userId , undo=false}  = req.body

    try{
        const liked = await Like.findOne({user: mongoose.Types.ObjectId(userId), post: mongoose.Types.ObjectId(postId)})
        
        if(liked){
            if(!undo) 
                return res.status(200).json({
                    success : true,
                    liked : true,
                })
            else {
                const res = await Like.findOneAndDelete({user: mongoose.Types.ObjectId(userId), post: mongoose.Types.ObjectId(postId)})
                if(res)    
                    return res.status(200).json({
                        success : true,
                        liked : false,
                    })
            }
        }
        else{
            const res = await Like.create({user: mongoose.Types.ObjectId(userId), post: mongoose.Types.ObjectId(postId)})
            if(res)  
                return res.status(200).json({
                    success : true,
                    liked : true,
                })
        }
    }catch(error){
        next(error)
    }
}
