var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model("Campground",campgroundSchema);
/////////

app.get("/",function(req,res){
    res.render("landing");
})
app.get("/campgrounds", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("index",{campgrounds : campgrounds});
       }
    }); 
});

app.get("/campgrounds/new", function(req, res){
   res.render("new"); 
});
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show",{campground : foundCampground});
        }
    })
});
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    
    //create new campground and save to DB
    Campground.create(
        {
            name : name,
            image : image,
            description : desc
            
        },  function(err, campground){
            if(err){
                console.log(err);
            } else {
                res.redirect("/campgrounds");
            }   
        })
    
    //redirect back to campgrounds page
})
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The YelpCamp Server has started");
});