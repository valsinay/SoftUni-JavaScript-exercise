const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
    description:{
        type:String,
        required:true,
        minlength:20
    },
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    creationDate:{
        type:mongoose.SchemaTypes.Date, default:Date.now
    }
});


module.exports =  mongoose.model('ArticleSchema', articleSchema);