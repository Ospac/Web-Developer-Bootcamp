var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });


//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);
//USER - email, name
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


// var newUser = new User({
//     email: "ospac@gmail.com",
//     name: "ksh"
// });
// newUser.posts.push({
//     title:"This is ospac",
//     content:"who is ksh"
// })
// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflection of apples",
//     content: "They are delicous"
// });n

// newPost.save(function(err, post){
//   if(err) {
//       console.log(err);
//   } else {
//       console.log(post);
//   }
// });

User.findOne({name:"ksh"}, function(err, user){
   if(err) {
       console.log(err);
   } else {
       user.posts.push({
           title: "3 things I really hate",
           content: "You. You. You"
       })
       user.save(function(err, user){
           if(err) {
               console.log(err);
           } else {
               console.log(user);
           }
       })
   }
});