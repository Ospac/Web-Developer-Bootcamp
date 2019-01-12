var mongoose = require("mongoose");

//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});


//return value of require("post") 
module.exports = mongoose.model("Post", postSchema);