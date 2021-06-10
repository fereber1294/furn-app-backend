const User = require('./../models/User')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.loginUser = async(req,res) => {

  //check if there are any errors with the check validation
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.json({
      errors:errors.array()
    })
  }

  const {email, password} = req.body
  
  try{
  //Email Validation
  //find the user on db
  let userFromDB = await User.findOne({email})
  console.log('Fetching the user: ',userFromDB)

  //if user is not found
  if(!userFromDB){
    return res.status(400).json({
      msg:'User not found'
    })
  }
  
  //Password Validation
  //extract the pwd and compare if it matches front with DB

  let correctPWD = await bcryptjs.compare(password, userFromDB.password)
  console.log(correctPWD)

  //if password doesn't match
  if(!correctPWD){
    return res.status(400).json({
      msg: "Ups! it looks that the password doesn't match. Please try again"
    })
  }

  //if it matches. Create a payload and pass it through the jwt generation process
  const payload = {
    user: {
      id:userFromDB.id
    }
  }

  console.log(payload)

  //JWT process
  jwt.sign(
    payload,
    process.env.SECRET,
    {
      expiresIn: 360000
    },
    (error,token) => {
      if(error) throw error

      console.log(token)
      res.json({
        token
      })
    }
  )

  }catch(e){
    res.status(400).json({
      msg: 'Sorry, there was an error on the server side.'
    })
  }

}

exports.verifyUser = async(req,res) => {
  const userId = req.user.id
  try{
    let user = await User.findById(userId).select('-password')
    res.json({
      user
    })

  }catch(e){
    res.status(400).json({
      msg: 'Sorry, there was an error on the server side.'
    })
  }
}