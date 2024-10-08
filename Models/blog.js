const {Schema,model} = require('mongoose');

const blogSchema = new Schema({
  title : {
  type : String,
  required  :true 
  },
  content : {
  type : String,
  },
  titleImg : {
  type : String,
  },
  writtenBy : {
  type  : Schema.Types.ObjectId,
  ref  : "User"
  }
});

const Blog = model("Blog",blogSchema);

module.exports = {Blog};
