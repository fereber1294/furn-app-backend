const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User') //model to create the user schema

exports.createUser = async (req,res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.json({
      errors: errors.array()
    })
  }

  //extract keys from req
  const {email, password, name} = req.body

  //lets check if user already exists in db
  try{
    let newUser = await User.findOne({email}) //check by email
    //if the user already exists
    if(newUser){
      return res.status(400).json({
        msg: 'We are sorry, that user already exists. Please choose a new one'
      })
    }

    //if the user is a new one...
    newUser = new User(req.body)
    console.log(newUser)

    //lets encrypt their password
    const salt = await bcryptjs.genSalt(10)
    newUser.password = await bcryptjs.hash(password, salt)

    await newUser.save() //save the user
    
    //creation of the JSON WebToken
    const payload = {
      user: {
        id: newUser.id
      }
    }

    jwt.sign(
      payload, //data sent to the front(User id)
      process.env.SECRET,
      {
        expiresIn:360000 //expiration time fot the token
      },
      (error,token) => {
        if (error) throw error
        res.json({
          token: token
        })
      }
    )
  } catch(e){
    console.log(e);
    res.status(400).json({
      msg: 'Sorry, there was an error on the server side.'
    })

  }
}