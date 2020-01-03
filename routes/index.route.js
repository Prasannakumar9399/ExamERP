const express=require("express");

const router=express.Router();

const ctrlUser=require('../controller/user.controller');

const ctrlAdmin=require('../controller/admin.controller');

const jetHelper=require('../config/jwt-helper');

router.post('/register',ctrlUser.register);

router.post('/authenticate',ctrlUser.authenticate);

router.get('/userProfile',jetHelper.verifyJwtToken,ctrlUser.userProfile);

router.post('/addQuiz',ctrlAdmin.addQuiz);

router.get('/getAllQuiz',ctrlAdmin.getAllQuiz);

router.put('/updateQuiz/:id',ctrlAdmin.updateQuiz);

router.delete('/deleteQuiz/:id',ctrlAdmin.deleteQuiz);

router.post('/:quizId/question',ctrlAdmin.addQuestion);

router.get('/:quizId/question',ctrlAdmin.getQuestion);

router.put('/question/:id',ctrlAdmin.updateQuestion);

router.delete('/question/:id',ctrlAdmin.deleteQuestion);

module.exports=router;