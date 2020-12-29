const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quiz');

router
    .get('/', quizController.quizSettings);
router
    .get('/questions', quizController.quizQuestions)
    .post('/questions', quizController.quizFeedback)
    .get('/results', quizController.results)


module.exports = router;