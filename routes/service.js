"use strict";

const express = require('express');
const router = express.Router();

const service_controller = require('../controllers/serviceController');

//GET options for type
router.get('/options', service_controller.getTypes);

// Create service
router.post('/', service_controller.create);

// Update service
router.put('/:id/', service_controller.update);

// Delete service
router.delete('/:id/', service_controller.dlt);

// GET service by id
router.get('/:id/', service_controller.read);

// GET service by type
router.get('/type/:type/', service_controller.getByType);

// Add reviews
router.post('/addReviewToService/:id/', service_controller.addReview);

// GET all services
router.get('/', service_controller.list);

router.get('/getBySalon/:salon', service_controller.getBySalon);

module.exports = router;
