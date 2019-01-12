var express = require("express");
var app = express();

// "/" => "Hi there"
app.get("/", function(req, res){
    res.send("Hi there");
});

app.get("/r/:subredditName",function(req,res){
   var redName = req.params.subredditName;
   res.send("Welcome to " + redName + " reddit!");
});

app.get("*",function(req,res){
    res.send("YOU ARE A STAR!!!!"); 
});

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});
