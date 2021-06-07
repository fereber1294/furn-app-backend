const jwt = require('jsonwebtoken')

module.exports = async (req,res,next) => {
  //get the token and insert it on the headers using local storage
  const token = req.header('x-auth-token')

  //if there is no token
  if(!token){
    return res.status(400).json({
      msg: 'There is no token'
    })
  }

  //validate token if we have one
  try{
    const verifyCypher = await jwt.verify(token, process.env.SECRET)
    console.log('verifying :',verifyCypher);

    req.user = verifyCypher.user
    next()
  }catch(e){
    res.status(400).json({
      msg: 'Sorry, there was an error on the server side.'
    })
  }

}