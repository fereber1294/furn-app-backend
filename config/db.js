const mongoose = require('mongoose')

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URL,{
    // await mongoose.connect(process.env.MONGODB_URL_LOCAL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log('DB created');
  } catch(e){
    console.log(e)
    process.exit(1)
  }
}

module.exports = connectDB