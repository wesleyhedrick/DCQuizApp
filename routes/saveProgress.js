const express = require('express');
const router = express.Router();
const {saveProgressController} = require('../controllers')

router.post('/', saveProgressController.save)

module.exports = router