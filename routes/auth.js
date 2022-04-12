const express= require('express');
const router = express.Router(); 

const { signup, login, forgetPassword, resetPassword } = require('./../controllers/adminController')

router.route("/register").post(signup)

router.route("/login").post(login)

router.route("/forgetpassword").post(forgetPassword)

router.route("/resetpassword/:resetToken").post(resetPassword)

module.exports = router