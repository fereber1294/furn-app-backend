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
    check('picture','Please load a picture').not().isEmpty(),
    check('description','Description of the item is a required field').not().isEmpty(),
    check('price','Price of the item is a required field').not().isEmpty(),
    check('quantity','Quantity of the item is a required field').not().isEmpty(),
    check('location','Location of the item is a required field, please type in the neighbourhood your items are located').not().isEmpty(),
    check('dimensions','Dimensions of the item are required').not().isEmpty(),
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