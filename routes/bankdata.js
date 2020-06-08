"use strict";

const express  = require('express');
const router   = express.Router();

const bankdata_controller = require('../controllers/bankdataController');


router.get('/', bankdata_controller.list); // List all BankData
router.post('/', bankdata_controller.create); // Create a new BankData
router.get('/:id', bankdata_controller.read); // Read a BankData by Id
router.put('/:id', bankdata_controller.update); // Update a BankData by Id
router.delete('/:id', bankdata_controller.remove); // Delete a BankData by Id


module.exports = router;