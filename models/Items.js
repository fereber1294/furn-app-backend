const mongoose = require('mongoose')

const ItemsSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  imageUrl:{
    type:String,
    required:true
  },
  description:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  offered:{
    type:Boolean,
    default:false
  },
  newPrice:{
    type:Number
  },
  quantity:{
    type:Number,
    required: true
  },
  location:{
    type:String,
  },
  dimensions:{
    type:String,
  },
  creator:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User'
  }
},
{
  timestamps: true
})

const Items = mongoose.model('Items', ItemsSchema)
module.exports = Items