"use strict";

const express = require('express');
const router = express.Router();

const salon_controller = require('../controllers/salonController');

// CREATE salon
router.post('/', salon_controller.create);

// UPDATE salon
router.put('/:id/', salon_controller.update);

// DELETE salon
router.delete('/:id/', salon_controller.dlt);

// GET all salons
router.get('/', salon_controller.list);

// GET salon by id
router.get('/:id', salon_controller.read);

// Add services
router.post('/addServiceToSalon/:id/', salon_controller.addService);

// Add reviews
router.post('/addReviewToSalon/:id/', salon_controller.addReview);

module.exports = router;
