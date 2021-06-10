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

require('dotenv').config({path: '.env'})


//2.MIDDLEWARES
connectDB() //conection to DB
app.use(cors()) //lets data connect between 2 envs
app.use(express.json({extended:true})) 

//3.ROUTES
app.use('/api/users',userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/items', itemsRoutes)


//.4 SERVER
app.listen(process.env.PORT, () => {
  console.log('server is up on port');
})