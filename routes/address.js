var express = require('express');
var router = express.Router();

var address_controller = require('../controllers/addressController');

// Create
router.post('/', address_controller.create);

// Update salon
router.put('/:id/', address_controller.update);

// Delete salon
router.delete('/:id/', address_controller.dlt);

// GET all salons
router.get('/', address_controller.list);

// GET salon by id
router.get('/:id', address_controller.read);

module.exports = router;
