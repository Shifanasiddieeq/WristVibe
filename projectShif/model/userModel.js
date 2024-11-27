const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  name: {
    type:String,
    required:true,
  },
  phone:{
    type:Number,
    required:true,
  },
  
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
},

});


module.exports = mongoose.model('User', userSchema);

