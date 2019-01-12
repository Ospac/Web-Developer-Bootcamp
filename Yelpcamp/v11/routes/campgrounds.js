var express     = require("express"),
    router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");

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
router.get("/new",middleware.isLoggedIn,function(req, res){
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
//isLoggedIn is also needed in post router (it can be accessed by postman) 
router.post("/",middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
      id : req.user._id,
      username : req.user.username
    };
    var newCampground = {name : name, image : image, description: desc, author : author};
    //create new campground and save to DB
    Campground.create(newCampground,  function(err, campground){
            if(err){
                console.log(err);
            } else {
                res.redirect("/campgrounds");
            }   
        })
    
    //redirect back to campgrounds page
})
// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found")

        } else {
            res.render("campgrounds/edit",{campground : foundCampground});
        }
    });
});
// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
   }) 
});


module.exports = router;