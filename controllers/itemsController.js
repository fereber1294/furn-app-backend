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
  let user = req.user.id
  try{
    const itemsList = await Items.find({creator:user}).sort({createdAt:-1})
    res.json({
      itemsList
    })
  }catch(e){
    res.status(400).json({
      msg:'Sorry, there was an error on the server side.'
    })
  }
}

exports.updateItem = async (req,res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.json({
      errors: errors.array()
    })
  }
  
  //extract item info
  const{name} = req.body
  const newItem = {} //to host the new data
  newItem.name = name

  console.log(newItem);
  itemId = req.params.id

  try{
    let item = await Items.findById(itemId)

    //checks if the item exists by id
    if(!item){
      return res-status(400).json({
        msg: "Item wasn't found"
      })
    }

    //checks if the user is the creator of the item
    if(item.creator.toString() !== req.user.id){
      return res.status(400).json({
        msg: "OOPS! You are trying to edit an item that wasn't created by you"
      })
    }

    //update the project
    project = await Items.findByIdAndUpdate({_id: itemId.toString()},{$set: newItem},{new:true})
  }catch(e){
    res.status(400).json({
      msg: 'Sorry, there was an error on the server side.'
    })
  }
}

exports.deleteItem = async(req,res) => {
  //get the data from the route
  const itemId = req.params.id

  //checks if the user is the creator of the item
  if(item.creator.toString() !== req.user.id){
    return res.status(400).json({
      msg: "OOPS! You are trying to edit an item that wasn't created by you"
    })
  }

  //Delete the item
  await Items.findByIdAndRemove({_id: itemId})
  res.json({
    msg: "Item was removed from DB"
  })

  try{
    let item = await Items.findById(itemId)


  }catch(e){
    res.status(400).json({
      msg: 'Sorry, there was an error on the server side.'
    })
  }
}