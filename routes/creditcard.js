"use strict";

const express  = require('express');
const router   = express.Router();

const creditcard_controller = require('../controllers/creditcardController');


router.get('/', creditcard_controller.list); // List all CreditCard
router.post('/',  creditcard_controller.create); // Create a new CreditCard
router.get('/:id', creditcard_controller.read); // Read a movie by Id
router.put('/:id', creditcard_controller.update); // Update a CreditCard by Id
router.delete('/:id', creditcard_controller.remove); // Delete a CreditCard by Id


module.exports = router;