const {model,Schema} = require('mongoose')

const commentSchema = new Schema({
    comment : {
        type : String,
        require  : true,
    },
    wrritenBy : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    onBlog : {
        type : Schema.Types.ObjectId,
        ref : "blog"
    }
})

const comment = model("comment",commentSchema);

module.exports = {comment}