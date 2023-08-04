const mongoose = require('mongoose');
const { Schema } = mongoose;
const Category = new Schema({
  name:{
    type:String,
    require:true
  },
  category:{
    type: Schema.Types.ObjectId,
    ref: 'subCategory'
  }

});
  module.exports = mongoose.model("category",Category);