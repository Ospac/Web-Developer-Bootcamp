var express     = require("express"),
    router      = express.Router();
var Campground = require("../models/campground")


//INDEX - show all campgrounds
router.get("/", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index",{campgrounds : campgrounds});
       }
    }); 
});

//NEW - show form to create  new campgrounds
router.get("/new", function(req, res){
   res.render("campgrounds/new"); 
});
//SHOW - show more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show",{campground : foundCampground});
        }
    })
});

//CREATE - add new campground to DB
router.post("/", function(req, res){
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

module.exports = router;
