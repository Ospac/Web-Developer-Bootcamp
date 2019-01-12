var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi there Welcome to my exercise!");
});

app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Wal Wal",
        goldfish: "..."
    }
    var sound = sounds[animal];
    res.send("The " + animal + " says " + "'" + sound + "'");
});
app.get("/repeat/:says/:num", function(req, res){   
    
    var say = "";
    var repeat = req.params.says;
    var times = Number(req.params.nums);
    for(var i = 0; i < times; i++){
        say = say + repeat +" ";
    } 
    res.send(say);
});

app.get("*", function(req, res){
   res.send("Sorry, Page not found!");
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});