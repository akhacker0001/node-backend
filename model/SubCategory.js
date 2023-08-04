const mongoose = require('mongoose');
const { Schema } = mongoose;
const SubCategory = new Schema({
  name:{
    type:String,
    require:true,
    unique:true,
  },
},  { timestamps: true });
// Ensure virtual fields are serialised.
// Schema.set('toJSON', {
//     virtuals: true,
//     versionKey:false,
//     transform: function (doc, ret) {   delete ret._id  }
//   });
  module.exports = mongoose.model("subCategory",SubCategory);