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

/**
 * 
 * @param {postId: String} _id of post
 * @returns {success: Boolean, post: Object}
 */

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

/**
 * 
 * @param {postId: String} _id of post
 * @returns {post: Object}
 */

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

/**
 * 
 * @param {postId: String} _id of post
 * @param {userId: String} _id of user
 * @param {comment: String} user comment
 * @returns {success: Boolean}
 */

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

/**
 * 
 * @param {postId : String} -> _id of post 
 * @param {userId : String} -> _id of user
 * @param {undo : Boolean} -> true : unlike post
 * @returns { success: Boolean , like: Boolean} 
 */

exports.likePost = (req,res,next) => {
    const postId = req.params.postId
    const {userId , undo=false}  = req.body

    try{
        const result = Post.findById(postId,async function(err,doc){
            if(err) return next(err);
            if(doc) {
                const likeDoc = doc.like.filter(({user}) => (user == userId))
                if(likeDoc.length !== 0){
                    if(undo){
                        doc.like = doc.like.filter(({user}) => (user != userId))
                        const stat = await doc.save()
                        if(stat) return res.status(200).json({success: true, liked: false})
                    }
                    return res.status(200).json({liked: true })
                }else{
                    try{
                        const stat = await doc.like.create({user: userId})
                        doc.like.push(stat);
                        doc.save(function(err,result){
                            if(err) return next(err);
                            if(result) return res.status(200).json({success: true , liked: true});
                        });   
                    }catch(error){
                        return next(error)
                    }
                }
            }else{
                return next(new ErrorResponse("invalid Post Id",400));
            }
        });
    }catch(error){
        return next(error)
    }
}


