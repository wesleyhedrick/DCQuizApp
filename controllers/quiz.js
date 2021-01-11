const { Questions } = require('../models');
const { createArrayOfAnswers, shuffle, layout} = require('../utils')

//PLAYERS CHOOSES WHAT KIND OF QUIZ THEY WANT
const quizSettings = async (req, res) => {
    const questionIds = await Questions.findAll({
        attributes: [
            'id'
        ]
})

    //STORE QUIZ LENGTH IN SESSION TO LATER FIGURE OUT GRADE PERCENTAGE.
    req.session.quizLength = questionIds.length;    
    
    //MAKE EMPTY ARRAY TO CONTAIN PLAYERS INCORRECT ANSWERS
    req.session.incorrectAnswers = []

    //Put just the ids in session storage
    req.session.questionIds = [];
    //INITIALIZE PLAYER SCORE AT ZERO AND QUESTION NUMBER AT 1
    req.session.score = 0;
    req.session.questionNum = 1;
    questionIds
        .forEach(item => req.session.questionIds
        .push(item.dataValues.id));
    
    req.session.questionIds = shuffle(req.session.questionIds);
    
    res.redirect('quiz/questions')
}

const quizQuestions = async (req, res) => {
    //GET LAST INDEX OF QUESTION NUMBERS
    const last = req.session.questionIds.length - 1;    
    
    questionObject = await Questions.findAll({
        where: {
            id: req.session.questionIds[last]
        }
    });
    

    //REMOVE QUESTION ID FROM LIST OF IDS
    let thisQuestionId = req.session.questionIds.pop();
    req.session.thisQuestionId = thisQuestionId;

    //Get first index of array because sequelize returns array of objects unfortunately.
    questionObject = questionObject[0];
    req.session.questionObject = questionObject;

    console.log('Here is your question object in its entirety', questionObject)
    console.log('Here is your question id', questionObject.id)

    //SHUFFLE THE ANSWERS IN THE QUESTION OBJECT
    let answers = createArrayOfAnswers(questionObject);
    //STORE QUESTIONOBJECT.QUESTION IN THE MORE READABLE VARIABLE: QUESTION
    let question = questionObject.question;
    //STORE THE QUESTIONOBJECT.ANSWER IN SESSION AS: CORRECTANSWER
    req.session.correctAnswer = questionObject.answer;
    let questionNum = req.session.questionNum;
    let score = req.session.score;
    
    res.render('quiz-question', {
        locals: {
            question, 
            answers, 
            questionNum, 
            score

        }, 
        ...layout
    })
}

const quizFeedback = async (req, res) => {
    const playerAnswer = req.body.answer;
    const correctAnswer = req.session.correctAnswer;
    let next;
    let ruling;
    let wrongAnswer;

    //INCREMENT QUESTION NUM
    req.session.questionNum += 1;
    
    //Determine which wrong answer the player chose. This is so that
    //progress can be saved an incorrect answers pulled up again from
    //the database.
    questionObject = req.session.questionObject
    for (k in questionObject) {
        if(questionObject[k]===playerAnswer){
            wrongAnswer = k;
        }
    }

    //EVALUATE ANSWER. ADJUST SCORE. SELECT THE APPROPRIATE PARTIALS FILE
    if(playerAnswer === correctAnswer){
        req.session.score +=1
        ruling = '/partials/correct'
    } else {
        missedQuestionId = req.session.thisQuestionId;
        
        req.session.incorrectAnswers.push({missedQuestionId,wrongAnswer});
        ruling = '/partials/incorrect'
    }


    //DECIDE IF ITS THE LAST QUESTION. AND RENDER THE APPROPRIATE PAGE
    //IF LAST, NEXT = GO-TO-END
    if(req.session.questionIds.length === 0){
        next = '/partials/go-to-end';
    } else {
        next = '/partials/next-question'
    }

    //RENDER QUESTION FEEDBACK PAGE
    res.render('question-feedback', {
        locals: {
            playerAnswer,
            correctAnswer
        },
        partials: {
            ruling,
            next, 
            header: '/partials/header',
            footer: '/partials/footer'
        }
    });
}

    
module.exports = {
    quizSettings, 
    quizQuestions,
    quizFeedback,
    
}




