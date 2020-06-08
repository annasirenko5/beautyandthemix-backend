"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const CreditCardController = require('../controllers/creditcard');


router.post('/', middlewares.checkAuthentication, CreditCardController.create); // Create a new CreditCard
router.get('/:id', CreditCardController.read); // Read a movie by Id
router.put('/:id', middlewares.checkAuthentication, CreditCardController.update); // Update a CreditCard by Id
router.delete('/:id', middlewares.checkAuthentication, CreditCardController.remove); // Delete a CreditCard by Id


module.exports = router;