var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds = [
    {name: "Salmon creek", image: "https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg"},            
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144297f3c878afe8b5_340.jpg"},
    {name: "Salmon creek", image: "https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg"},            
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144297f3c878afe8b5_340.jpg"},
    {name: "Salmon creek", image: "https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg"},            
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144297f3c878afe8b5_340.jpg"}
];
    
app.get("/",function(req,res){
    res.render("landing");
})
app.get("/campgrounds", function(req,res){
    res.render("campgrounds",{campgrounds : campgrounds});
    
});
app.get("/campgrounds/new", function(req, res){
   res.render("new"); 
});
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name : name, image : image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
})
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The YelpCamp Server has started");
});