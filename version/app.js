// export GEOCODER_API_KEY=AIzaSyBLhRBcu9aEMCR5UyEYz2_Na_V2OBmdHzY;
require('dotenv').config();

var express        = require("express");
var app            = express();
var mongoose       = require("mongoose");
var bodyParser     = require("body-parser");
var passport       = require("passport");
var LocalStrategy  = require("passport-local");
var Comment        = require("./models/comment");
var Campground     = require('./models/campground');
var User           = require("./models/user");
var seedDB         = require("./seeds");
var methodOverride = require("method-override");
var flash          = require("connect-flash");


//require routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

    
mongoose.connect("mongodb+srv://MonsterPan:109qwer627@cluster0-1ap4n.gcp.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(function(){
    console.log("Connected to DB!");
}).catch(function(err){
    console.log("error: ",err.message);
});

// app.get('/',function(req,res){
//     res.send("is this thing mongoose on?");
// })
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();


app.locals.moment = require('moment');
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");

   next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(8080, function(){
   console.log("The YelpCamp Server Has Started!");
});