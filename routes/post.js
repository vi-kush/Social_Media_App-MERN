const express= require('express');
const router = express.Router(); 
const path = require('path')

const uploadMiddleware = require('./../middleware/upload')

const { createPost, updatePost, removePost, getPost } = require('../controllers/postController')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,process.env.UPLOAD_PATH_POST)
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage})


router.route("/createpost").post(upload.single('postCover'), uploadMiddleware, createPost)

router.route("/updatepost/:postId").patch(upload.single('postCover'), uploadMiddleware, updatePost)

router.route("/removepost/:postId").post(removePost)

router.route("/getpost/:postId").get(getPost)

module.exports = router