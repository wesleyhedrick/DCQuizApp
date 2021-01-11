const { Progress } = require('../models')
const save = async (req, res) => {
    //Get info from session
    const {username,score,questionNum,quizLength} = req.session
    questionIds = JSON.stringify(req.session.questionIds);
    incorrectAnswers = JSON.stringify(req.session.incorrectAnswers);

    //Put session info into database
    await Progress.create({
        username,
        questionIds,
        score,
        questionNum,
        quizLength, 
        incorrectAnswers
    })

    //Render feedback page

    res.render('progress-saved')
};

module.exports = {
    save
}