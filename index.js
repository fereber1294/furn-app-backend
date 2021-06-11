//1. IMPORTS
//LIBRARIES
const express = require('express')
const cors = require('cors')
//CONNECTION TO DB
const connectDB = require('./config/db')

const app = express()
//ROUTES
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const itemsRoutes = require('./routes/items')

const cloudinary = require('cloudinary')

require('dotenv').config({path: '.env'})


//2.MIDDLEWARES
connectDB() //conection to DB
app.use(cors()) //lets data connect between 2 envs
app.use(express.json({extended:true})) 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

//3.ROUTES
app.use('/api/users',userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/items', itemsRoutes)


//.4 SERVER
app.listen(process.env.PORT, () => {
  console.log('server is up on port');
})