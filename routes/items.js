const express = require('express')
const router = express.Router()

const auth = require('./../middleware/auth')
const {check} = require('express-validator')
const itemsController = require('./../controllers/itemsController')
const { Router } = require('express')

//ROUTES
//CRUD

//CREATE PROJECT
router.post()
