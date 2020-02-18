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
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);