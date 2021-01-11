const {layout} = require('../utils')

const results = (req, res) => {
    let score = req.session.score;
    let quizLength = req.session.quizLength;
    let incorrectAnswers = req.session.incorrectAnswers;
    let comment; 

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
            quizLength,
            comment,
            incorrectAnswers
        }, 
        ...layout
    })
}



module.exports = {
    results
}

