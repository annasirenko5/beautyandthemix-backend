"use strict";

const express  = require('express');
const router   = express.Router();

const subscription_controller = require('../controllers/subscriptionController');


router.get('/', subscription_controller.list); // List all subscription
router.post('/', subscription_controller.create); // Create a new subscription
router.get('/:id', subscription_controller.read); // Read a subscription by Id
router.delete('/:id', subscription_controller.remove); // Delete a subscription by Id


module.exports = router;