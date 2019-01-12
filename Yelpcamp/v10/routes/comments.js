var express     = require("express"),
    router      = express.Router({mergeParams : true});
var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");
var middleware  = require("../middleware");

//----------------------
// COMMENTS ROUTES
//----------------------
router.get("/new",middleware.isLoggedIn,function(req, res) {
    
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground : campground});
        }
    })
});

//Comments Create
router.post("/" ,middleware.isLoggedIn,function(req, res){
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
                    //redirect
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        res.render("comments/edit",{campground_id : req.params.id, comment : foundComment }); 
        // in case of campground in 'edit.ejs', it needs only campground._id 
        // there no need to pass campground instance

    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
      if(err){
          console.log(err);
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
   }); 
});

//COMMENTS DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership ,function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err, foundComment){
      if(err){
          console.log(err);
          res.redirect("back");
      } else {
          res.redirect("back");
      }
   });
});


module.exports = router;
