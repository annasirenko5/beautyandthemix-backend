"use strict";

const express  = require('express');
const router   = express.Router();

const event_controller = require('../controllers/eventController');

// GET all events
router.get('/', event_controller.list);

// CREATE event
router.post('/', event_controller.create);

// GET all events with free dates
router.get('/freedates', event_controller.getFreeDates);

// GET event by id
router.get('/:id', event_controller.read);

// UPDATE Event
router.put('/:id', event_controller.update);

// DELETE event
router.delete('/:id', event_controller.remove);

// GET events by service
router.get('/byService/:service', event_controller.getByService);


module.exports = router;
