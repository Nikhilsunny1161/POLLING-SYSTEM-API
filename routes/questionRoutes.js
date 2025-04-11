const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const optionController = require('../controllers/optionController');

router.post('/create', questionController.create);
router.get('/:id', questionController.getQuestion);
router.delete('/:id/delete', questionController.deleteQuestion);
router.post('/:questionId/options/create', optionController.addOption);

module.exports = router;