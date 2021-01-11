const express = require('express');
const router = express.Router();

const {signupController} = require('../controllers');

router.get('/', signupController.signupOffer)
      .post('/', signupController.createUser)
      .get('/user-exists', signupController.userNameExists)
      
      

module.exports = router;

