const Question   = require("../models/question.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'NEWTONSCHOOL';

const createQuestion = async (req, res) => {

    const { questionName, topic, rating, link, status, token } = req.body;
    try{
        if(!token){
            res.status(401).json({
                status: 'fail',
                message: 'Missing token'
            });
        }
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, JWT_SECRET);
        }catch(err){
            res.status(401).json({
                status: 'fail',
                message: 'Invalid token'
            });
        }
        const newQuestion = {
            questionName,
            topic,
            rating,
            link,
            status,
            creatorId: decodedToken.userId,
        };
        const question = await Question.create(newQuestion);
        res.status(200).json({
        message: 'Question added successfully to questionBank',
            questionId: question._id,
            status: 'success'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

const getQuestion = async (req, res) => {

    const token = req.body.token;
    try{
        if(!token){
            res.status(401).json({
                status: 'fail',
                message: 'Missing token'
            });
        }
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, JWT_SECRET);
        }catch(err){
            res.status(401).json({
                status: 'fail',
                message: 'Invalid token'
            });
        }
        const questions = await Question.find( {creatorId : decodedToken.userId} );
        res.status(200).json({
            questions,
            status: 'success'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

const deleteQuestion = async (req, res) => {

    try{
        const questiontId = req.params.id;
        const question = await Question.findById(questiontId);
        if(!question)
        {
            res.status(404).json({
                status: 'fail',
                message: "Given Question doesn't exist"
            })
        }
        await Question.findByIdAndDelete(questiontId);
        res.status(200).json({
            status: 'success',
            message: 'Question deleted successfully'
        })
        
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

/*

updateComment Controller


1. update the question with given id in req.params.
2. update that field that is present in req.body except token.

req.body = { questionName, topic, rating, link, status, token }

req.body can contain any of the given field not necessary all.

Response --> 

1. Success

200 Status code
json = {
  status: 'success',
  message: 'Question updated successfully'
}

2. Question Doesnot exist

404 Status Code
json = {
    status: 'fail',
    message: 'Given Question doesn't exist'
}

3. Something went wrong

500 Status Code
json = {
    status: 'fail',
    message: error message
}

*/

const updateQuestion = async (req, res) => {

    //Write your code here.

}

module.exports = { createQuestion, getQuestion, deleteQuestion, updateQuestion };
