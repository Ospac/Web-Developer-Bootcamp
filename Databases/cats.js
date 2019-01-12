var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app");

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});
//adding a new cat to the DB

var Cat = mongoose.model("Cat", catSchema);

// var geroge = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// })

// geroge.save(function(err, cat){ //callback will be executed after 'save'
//   if(err){
//       console.log("ERROROROR!");
//   } else{
//       console.log("We just saved to database");
//       console.log(cat);
//   }
// });

Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland"
},function(err, cat){
    if(err){
        console.log(err);
    }   else{
        console.log("createdddd");
        console.log(cat);
    }
});

//retrieve all cats from the DB and console.log each one
Cat.find({},function(err, cats){
    if(err){
        console.log("Oh No! Error!")
        console.log(err);
    }
    else{
        console.log("All the Cats..");
        console.log(cats);
    }
});