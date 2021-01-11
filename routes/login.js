const express = require('express');
const router = express.Router();

const {loginController} = require('../controllers');

router.get('/', loginController.loginLanding)
      .post('/', loginController.loginVerify)
      .get('/login-error', (req, res) => res.render('login-error'))

module.exports = router;