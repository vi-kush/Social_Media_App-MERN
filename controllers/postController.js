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

exports.addComment = async(req,res,next) => {
    const postId = req.params.postId
    const {userId, comment} = req.body
    
    try{
        const post = await Post.findById(postId)

        if(post){
            let success = await post.comment.create({comment, user: mongoose.Types.ObjectId(userId)})
            post.comment.push(success)
            success = await post.save();  
            if(success)
                return res.status(200).json({
                    success: true
                })
            else return next(new ErrorResponse("Error in adding comment",404))
        }else return next(new ErrorResponse("invalid post_id",404))
    }catch(error){
        return next(new ErrorResponse(error,404))
    }

}

exports.removeComment = async(req,res,next) => {
    const postId = req.params.Id

    try{
        
    }catch(error) {
        return next(error)
    }
}

exports.likePost = (req,res,next) => {
    const postId = req.params.postId
    const {userId , undo=false}  = req.body

    try{
        const result = Post.findOne({_id : postId , "like.user": userId },async function(err,doc){
            if(err) return next(err);
            if(doc) {
                if(undo){
                    doc.like = doc.like.filter(({user}) => (user != userId))
                    const stat = await doc.save()
                    if(stat) return res.status(200).json({success: true, liked: false , doc})
                }
                return res.status(200).json({liked: true ,doc})
            }else{
                const docu = await Post.findOne({_id : postId})
                if(docu){
                    try{
                        const stat = await docu.like.create({user: userId})
                        docu.like.push(stat);
                        docu.save(function(err,result){
                            if(err) return next(err);
                            if(result) return res.status(200).json({liked: true});
                        });   
                    }catch(error){
                        return next(error)
                    }
                }
                else return next(new ErrorResponse("some Error occured",404))
            }
        });
    }catch(error){
        return next(error)
    }
}


// exports.likePost = async(req,res,next) => {
//     const postId = req.params.postId
//     const {userId , undo=false}  = req.body

//     try{
//         // const liked = await Like.findOne({user: mongoose.Types.ObjectId(userId), post: mongoose.Types.ObjectId(postId)})
        
//         // if(liked){
//         //     if(!undo) 
//         //         return res.status(200).json({
//         //             success : true,
//         //             liked : true,
//         //         })
//         //     else {
//         //         const result = await Like.findOneAndDelete({user: mongoose.Types.ObjectId(userId), post: mongoose.Types.ObjectId(postId)})
//         //         if(result)    
//         //             return res.status(200).json({
//         //                 success : true,
//         //                 liked : false,
//         //             })
//         //     }
//         // }
//         // else{
//         //     const result = await Like.create({user: mongoose.Types.ObjectId(userId), post: mongoose.Types.ObjectId(postId)})
//         //     if(result)  
//         //         return res.status(200).json({
//         //             success : true,
//         //             liked : true,
//         //         })
//         // }
//     }catch(error){
//          return next(error)
//     }
// }
