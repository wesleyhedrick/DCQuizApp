const { Questions } = require('../models');
const { createArrayOfAnswers } = require('../utils')

//PLAYERS CHOOSES WHAT KIND OF QUIZ THEY WANT
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

    //STORE QUIZ LENGTH IN SESSION TO LATER FIGURE OUT GRADE PERCENTAGE.
    req.session.quizLength = req.session.questionIds.length;
    //MAKE EMPTY ARRAY TO CONTAIN PLAYERS INCORRECT ANSWERS
    req.session.incorrectAnswers = []

    console.log('here is your last index', indexOfQuestionToBeAsked)
    console.log('Here is what is stored in session', req.session.questionIds)
    
    questionObject = await Questions.findAll({
        where: {
            id: req.session.questionIds[indexOfQuestionToBeAsked]
        }
    });

    //REMOVE QUESTION ID FROM LIST OF IDS
    req.session.questionIds.pop();
    
    //Get first index of array because sequelize returns array of objects unfortunately.
    questionObject = questionObject[0];
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

        }
    })
}

const quizFeedback = async (req, res) => {
    const playerAnswer = req.body.answer;
    const correctAnswer = req.session.correctAnswer;
    let next;
    let ruling;
    //INCREMENT QUESTION NUM
    req.session.questionNum += 1;
    

    //EVALUATE ANSWER. ADJUST SCORE. SELECT THE APPROPRIATE PARTIALS FILE
    if(playerAnswer === correctAnswer){
        req.session.score +=1
        ruling = '/partials/correct'
    } else {
        req.session.incorrectAnswers.push(playerAnswer);
        ruling = '/partials/incorrect'
    }


    //Is this the last question? Use req.session
    if(req.session.questionIds.length === 0){
        next = '/partials/go-to-end';
    } else {
        next = '/partials/next-question'
    }
    res.render('question-feedback', {
        locals: {
            playerAnswer,
            correctAnswer
        },
        partials: {
            ruling,
            next
        }
    });
}

const results = () => {
    let score = req.session.score;
    let comment; 
    let incorrectAnswers = req.session.incorrectAnswers;
    //EVALUATE HOW WELL PLAYER DID BASED ON CORRECT ANSWER/QUIZ LENGTH
    if(score/quizLength === 1) {
        comment = 'Perfect score! Either you\'re gifted or the hard work is paying off. Keep it up.';
    } else if (score/quizLength > .8){ 
        comment = 'This was a solid performance! Keep up the good work.'
    } else {
        comment = 'You need to work harder'
    }

    res.render('results', {
        locals: {
            score,
            comment,
            incorrectAnswers
        }
    })
}
    
module.exports = {
    quizSettings, 
    quizQuestions,
    quizFeedback,
    results
}




