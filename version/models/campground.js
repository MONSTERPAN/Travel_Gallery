var mongoose    = require("mongoose");    
mongoose.connect("mongodb+srv://MonsterPan:109qwer627@cluster0-1ap4n.gcp.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(function(){
    console.log("Connected to DB!");
}).catch(function(err){
    console.log("error: ",err.message);
});

var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   location: String,
   lat: Number,
   lng: Number,
   createdAt: { type: Date, default: Date.now },
   author: {
       id:{
           type: mongoose.Schema.Types.ObjectId,
            ref: "User"
       },
       username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Campground", campgroundSchema);