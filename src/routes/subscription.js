"use strict";

const express  = require('express');
const router   = express.Router();

const subscription_controller = require('../controllers/subscriptionController');

// GET all subscriptions
router.get('/', subscription_controller.list);

// CREATE new subscription
router.post('/', subscription_controller.create);

// GET subscription by id
router.get('/:id', subscription_controller.read);

// DELETE subscription
router.delete('/:id', subscription_controller.remove);

// UPDATE subscription
router.put('/:id', subscription_controller.update);

module.exports = router;