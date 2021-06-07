const express = require('express')
const router = express.Router()

const {check, validationResult} = require('express-validator')
const userController = require('./../controllers/userControllers') //were all functions for the user will be allocated

//Create a new user
router.post('/',
  [
    //validate data on the form that creates the user
    check('name', 'Name field is mandatory').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must contain 6 characters').isLength({min:6})
  ],
  userController.createUser
)

//routes per user
router.get('/frb', (req,res) => {
  res.json({
    example:'123'
  })
})

module.exports = router