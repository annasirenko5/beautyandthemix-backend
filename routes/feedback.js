"use strict";

const express  = require('express');
const router   = express.Router();

const feedback_controller = require('../controllers/feedbackController');


router.get('/', feedback_controller.list); // List all feedback
router.post('/', feedback_controller.create); // Create a new feedback
router.get('/:id', feedback_controller.read); // Read a feedback by Id
router.delete('/:id', feedback_controller.remove); // Delete a feedback by Id

router.get('/bySalon/:salon', feedback_controller.bySalon);


module.exports = router;