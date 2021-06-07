const { Router } = require('express')
const express = require('express')
const router = express.Router()

const{check} = require('express-validator')
const authController = require('./../controllers/authController')

const auth = require('./../middleware/auth')

//Log in
router.post('/', [
  check('email','Please enter a valid email').isEmail(),
  check('password', 'The password must contain 6 characters minimum').isLength({min:6})
], authController.loginUser)

//verify user
router.get('/', auth,authController.verifyUser)
module.exports = router