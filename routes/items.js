const express = require('express')
const router = express.Router()

const auth = require('./../middleware/auth')
const {check} = require('express-validator')
const itemsController = require('./../controllers/itemsController')
const { Router } = require('express')

//ROUTES
//CRUD

//CREATE A NEW ITEM
router.post('/', 
  auth,
  [
    check('name','Name of the item is a required field').not().isEmpty(),
    check('imageUrl','Please load a picture').not().isEmpty(),
    check('description','Description of the item is a required field').not().isEmpty(),
    check('price','Price of the item is a required field').not().isEmpty(),
    check('quantity','Quantity of the item is a required field').not().isEmpty(),
  
  ]
  ,itemsController.createItem)

  //READ AN ITEM
  router.get('/',
    auth,
    itemsController.getItem
  )

  //UPDATE AN ITEM
  

  //DELETE AN ITEM

  module.exports = router