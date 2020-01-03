const mongoose = require('mongoose');

var quizSchema=new mongoose.Schema({
    QuizSetId:{type:String,unique:true},
    QuizName:{type:String},
    Questions:{type:Number},
    lstQuestion:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
    }]

})

mongoose.model('Quiz',quizSchema);