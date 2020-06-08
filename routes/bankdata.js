"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const BankDataController = require('../controllers/bankdata');


router.post('/', middlewares.checkAuthentication, BankDataController.create); // Create a new BankData
router.get('/:id', BankDataController.read); // Read a BankData by Id
router.put('/:id', middlewares.checkAuthentication, BankDataController.update); // Update a BankData by Id
router.delete('/:id', middlewares.checkAuthentication, BankDataController.remove); // Delete a BankData by Id


module.exports = router;