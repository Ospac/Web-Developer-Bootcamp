var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",function(req, res){
    res.render("home");
});

app.get("/fallinlovewith/:name", function(req,res){
    var thing = req.params.name;
    res.render("love",{
       name : thing 
    });
});

app.get("/posts",function(req, res){
   var posts = [
            { title: "공", author: "suhyung"},
            { title: "심심하다", author: "suhyung2"},
            { title: "점심 먹을사람...", author: "suhyung3"},
            { title: "ejs 재밌당", author: "suhyun4g"},
       ];
       
    res.render("post",{
        posts: posts
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Listening!!");
});
