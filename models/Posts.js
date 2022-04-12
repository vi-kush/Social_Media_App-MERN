const mongoose = require('mongoose')
// const {ObjectId} = require('mongoose.Types')

const PostSchema = mongoose.Schema({
    postCategory: {
        type: Number,
        min: 1,
        max: 4,
        required: [true,"{1: Article, 2: Education, 3: MeetUp, 4: Job}"],
    },
    postTitle: {
        type: String,
        required: [true, "Title missing"],
    },
    postCover: {
        type: String,
        required: false,
        default: "noPostImage.png",
        get: val => (process.env.UPLOAD_PATH_POST+val),
    },
    postContent: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'Users',
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
    },
},{timestamps:true})

// PostSchema.pre('save', function (next, req) {
//     var Users = mongoose.model('User');
//     Users.findOne({email:req.body.email}, function (err, found) {
//         if (found) return next();
//         else return next(new Error({error:"not found"}));
//     });
// });


module.exports = mongoose.model("Post",PostSchema)