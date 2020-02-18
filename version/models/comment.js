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

var commentSchema = mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);