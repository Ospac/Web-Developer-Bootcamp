var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");


seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


app.get("/",function(req,res){
    res.render("landing");
})
app.get("/campgrounds", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index",{campgrounds : campgrounds});
       }
    }); 
});

app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show",{campground : foundCampground});
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

//----------------------
// COMMENTS ROUTES
//----------------------
app.get("/campgrounds/:id/comments/new",function(req, res) {
    
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground : campground});
        }
    })
});

app.post("/campgrounds/:id/comments",function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The YelpCamp Server has started");
});