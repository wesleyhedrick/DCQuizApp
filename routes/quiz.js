const express = require('express');
const router = express.Router();
const {quizController} = require('../controllers');

router
    .get('/', quizController.quizSettings);
router
    .get('/questions', quizController.quizQuestions)
    .post('/questions', quizController.quizFeedback)



module.exports = router;