const Items = require('./../models/Items')
const {validationResult} = require('express-validator')

exports.createItem = async (req,res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.json({
      errors: errors.array()
    })
  }

  //CREATION OF THE ITEM ON DB
  try{
    const item = new Items(req.body)

    item.creator = req.user.id //gets the user id

    //SAVE THE PROJECT
    item.save()
    res.json({
      msg:'Item added to DB',
      itemCreated: item
    })
  }catch(e){
    res.status(400).json({
      msg: 'Project could not be created'
    })
  }
}

exports.getItem = async (req,res) => {
  console.log('hello');
  let user = req.user.id
  console.log(user);
  try{
    const itemsList = await Items.find({creator:user}).sort({createdAt:-1})
    console.log(itemsList);
    res.json({
      projectsList
    })
  }catch(e){
    res.status(400).json({
      msg:'Sorry, there was an error on the server side.'
    })
  }
}