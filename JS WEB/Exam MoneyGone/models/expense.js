const mongoose = require('mongoose');

let expenseSchema = new mongoose.Schema({
    merchant: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: Date.now
    },
    total: {
        type: Number
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
       maxlength:50
    },
    report:{
        type:Boolean,
        required:true,
        default:false
    },
    creator:{
        type:mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }

});

module.exports = mongoose.model('Expense', expenseSchema);