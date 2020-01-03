const mongoose=require('mongoose');
//Now the model name Quiz can be used by constant Quiz
const Quiz=mongoose.model('Quiz');
const Question=mongoose.model('Question');
module.exports.addQuiz=(req,res,next)=>{
    //creating the object of module quiz
  var quiz=new Quiz();
  quiz.QuizSetId=req.body.QuizSetId;
  quiz.QuizName=req.body.QuizName;
  quiz.Questions=req.body.Questions;

  quiz.save((err,data)=>{
      if(!err){
          res.send(data);
      }
  })
  
}

module.exports.getAllQuiz=(req,res,next)=>{
      var getAllQuiz=Quiz.find({});
      getAllQuiz.exec((err,data)=>{
          if(!err)
          res.send(data);
      })

}
//It is the function to edit the particular exam

module.exports.updateQuiz=(req,res,next)=>{
      //creating object to send the json to server
    var quiz={
     QuizSetId:req.body.QuizSetId,
     QuizName:req.body.QuizName,
     Questions:req.body.Questions   
    }
    var id=req.params.id;
   Quiz.findByIdAndUpdate(id,{$set:quiz},{new:true},(err,doc)=>{
       if(!err){res.send(doc)}
   });
       
}

module.exports.deleteQuiz=(req,res,next)=>{
  
    var id=req.params.id;
    Quiz.findByIdAndRemove(id,(err,doc)=>{
        if(!err){res.send(doc)}
    });
    }

    module.exports.addQuestion=async (req,res,next)=>{
        //find the quiz
      const quiz=await Quiz.findOne({_id:req.params.quizId});
     
        //create a question
     const question=new Question();
     question.QuesId=req.body.QuesId;
     question.Ques=req.body.Ques;
     question.option_A=req.body.option_A;
     question.option_B=req.body.option_B;
     question.option_C=req.body.option_C;
     question.option_D=req.body.option_D;
     question.corrAns=req.body.corrAns;
     question.quiz=quiz._id;
     await question.save();
       //associate quiz with question
       quiz.lstQuestion.push(question._id);
       //save the quiz with the listQuestion  
       await quiz.save();
       res.send(question);
       }
module.exports.getQuestion=async (req,res,next)=>{
    //find the quiz which question to be fetched
    const quiz=await Quiz.findOne({_id:req.params.quizId}).populate("lstQuestion");
     res.send(quiz);    
}
module.exports.updateQuestion=async (req,res,next)=>{
    //first take the id of question to be updated
    const question=await Question.findOneAndUpdate(
        {_id:req.params.id},
    req.body,
    {new:true}
    );
    res.send(question);
}
module.exports.deleteQuestion=async (req,res,next)=>{

    const question=await Question.findByIdAndRemove({_id:req.params.id});
     
    res.send(question);
}

