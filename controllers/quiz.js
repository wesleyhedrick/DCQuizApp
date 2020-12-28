const { Questions } = require('../models');
const { createArrayOfAnswers } = require('../utils')

const quizSettings = async (req, res) => {
    const questionIds = await Questions.findAll({
        attributes: [
            'id'
        ]
    })

    //Put just the ids in session storage
    req.session.questionIds = [];

    //INITIALIZE PLAYER SCORE AT ZERO AND QUESTION NUMBER AT 1
    req.session.score = 0;
    req.session.questionNum = 1;

    questionIds
        .forEach(item => req.session.questionIds
            .push(item.dataValues.id));
    
    res.redirect('quiz/questions')
}

const quizQuestions = async (req, res) => {
    //GET LAST INDEX OF QUESTION NUMBERS
    const indexOfQuestionToBeAsked = req.session.questionIds.length - 1;
    console.log('here is your last index', indexOfQuestionToBeAsked)
    console.log('Here is what is stored in session', req.session.questionIds)
    
    questionObject = await Questions.findAll({
        where: {
            id: req.session.questionIds[indexOfQuestionToBeAsked]
        }
    });

    req.session.questionIds.pop();
    console.log('after popping from questionIds, here is what is stored in session'
    , req.session.questionIds)
    //Get first index of array because sequelize returns array of objects unfortunately.
    questionObject = questionObject[0];

    //SHUFFLE THE ANSWERS IN THE QUESTION OBJECT
    let answers = createArrayOfAnswers(questionObject);

    //STORE QUESTIONOBJECT.QUESTION IN THE MORE READABLE: QUESTION
    let question = questionObject.question;
    //STORE THE QUESTIONOBJECT.ANSWER IN SESSION AS: CORRECTANSWER
    req.session.correctAnswer = questionObject.answer;

    console.log('here is your question', question)
    console.log('here is the correct answer in session', req.session.correctAnswer)
    let questionNum = req.session.questionNum;
    let score = req.session.score;
    
    res.render('quiz-question', {
        locals: {
            question, 
            answers, 
            questionNum, 
            score

        }
    })
}

const quizFeedback = async (req, res) => {
    const playerAnswer = req.body.answer;
    const correctAnswer = req.session.correctAnswer;

    console.log(playerAnswer);
    console.log(correctAnswer);

    //INCREMENT QUESTION NUM
    req.session.questionNum += 1;
    
    //compare student response with correct answer stored in session. 
    if(playerAnswer === correctAnswer){
        let score = req.session.score += 1;
        res.render('question-feedback', {
            locals: {
                playerAnswer,
                correctAnswer,
                score
            },
            partials: {
                ruling: '/partials/correct'
            }
        });
    } else {
        res.render('question-feedback', {
            locals: {
                playerAnswer,
                correctAnswer
            },
            partials: {
                ruling: '/partials/incorrect'
            }
        });
    }
}

module.exports = {
    quizSettings, 
    quizQuestions,
    quizFeedback
}




