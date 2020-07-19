"use strict";

const express  = require('express');
const router   = express.Router();

const event_controller = require('../controllers/eventController');


router.get('/', event_controller.list); // List all event
router.post('/', event_controller.create); // Create a new event
router.get('/freedates', event_controller.getFreeDates);
router.get('/:id', event_controller.read); // Read a event by Id
router.put('/:id', event_controller.update); // Update a event by Id
router.delete('/:id', event_controller.remove); // Delete a event by Id
router.get('/byService/:service', event_controller.getByService);


module.exports = router;
