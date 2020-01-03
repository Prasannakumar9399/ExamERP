const mongoose=require('mongoose');

const QuestionSchema=new mongoose.Schema({
    QuesId:{type:String},
    Ques:{type:String,unique:true},
    option_A:{type:String},
    option_B:{type:String},
    option_C:{type:String},
    option_D:{type:String},
    corrAns:{type:String},
    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz"
    }
});
mongoose.model("Question",QuestionSchema);