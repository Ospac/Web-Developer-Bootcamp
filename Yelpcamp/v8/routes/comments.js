var express     = require("express"),
    router      = express.Router({mergeParams : true});
var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");
//----------------------
// COMMENTS ROUTES
//----------------------
router.get("/new",isLoggedIn,function(req, res) {
    
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground : campground});
        }
    })
});

//Comments Create
router.post("/" ,isLoggedIn,function(req, res){
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
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    //redirect
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;