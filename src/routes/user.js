"use strict";

const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

// Create user
router.post('/', user_controller.create);

// Update user
router.put('/:id/', user_controller.update);

// Delete user
router.delete('/:id/', user_controller.dlt);

// GET all users
router.get('/', user_controller.list);

// GET user by id
router.get('/:id', user_controller.read);

// Add booking
router.post('/addBookingToUser/:id/', user_controller.addBooking);

module.exports = router;
