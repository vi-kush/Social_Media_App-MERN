const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    comment:{
        type: String,
        required: true,
    },
    post:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Post',
        validate: {
            isAsync: true,
            validator: function(value) {
                return new Promise((resolve, reject) => {
                    mongoose.model("Post").findOne({ _id: value }, (err, result) => {
                        if (result) {
                            return resolve(true)
                        } else
                            return reject(
                                new Error(
                                    `FK Constraint 'checkObjectsExists' for '${value.toString()}' failed`
                                )
                            )
                    })
                })
            },
            message: `Post doesn't exist`
        }
    },
    user:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
        validate: {
            isAsync: true,
            validator: function(value) {
                return new Promise((resolve, reject) => {
                    mongoose.model("User").findOne({ _id: value }, (err, result) => {
                        if (result) {
                            return resolve(true)
                        } else
                            return reject(
                                new Error(
                                    `FK Constraint 'checkObjectsExists' for '${value.toString()}' failed`
                                )
                            )
                    })
                })
            },
            message: `User doesn't exist`
        }
    }
},{timestamp:true})



module.exports = mongoose.model('Comment',CommentSchema)