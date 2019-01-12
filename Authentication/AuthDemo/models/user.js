var mongoose = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username : String,
    password : String
});
UserSchema.plugin(passportLocalMongoose);
// that take care of everything from hashing to the salting to storing things in database.
module.exports = mongoose.model("User",UserSchema);
