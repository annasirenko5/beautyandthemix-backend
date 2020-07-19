"use strict";

const express = require('express');
const router = express.Router();

const address_controller = require('../controllers/addressController');

// CREATE address
router.post('/', address_controller.create);

// UPDATE address
router.put('/:id/', address_controller.update);

// DELETE address
router.delete('/:id/', address_controller.dlt);

// GET all addresses
router.get('/', address_controller.list);

// GET address by id
router.get('/:id', address_controller.read);

module.exports = router;
