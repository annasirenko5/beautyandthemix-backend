"use strict";

const express  = require('express');
const router   = express.Router();

const feedback_controller = require('../controllers/feedbackController');

// GET all feedbacks
router.get('/', feedback_controller.list);

// CREATE new feedback
router.post('/', feedback_controller.create);

// GET sorted list of salons with average rating
router.get('/avgReviews', feedback_controller.AvgReviews);

// GET feedback by id
router.get('/:id', feedback_controller.read);

// DELETE feedback
router.delete('/:id', feedback_controller.remove);

// GET feedbacks by salon
router.get('/bySalon/:salon', feedback_controller.bySalon);

module.exports = router;
