var express = require('express');
var router = express.Router();

var address_controller = require('../controllers/addressController');

// Create
router.post('/create', address_controller.create);

// Update salon
router.put('/:id/update', address_controller.update);

// Delete salon
router.delete('/:id/delete', address_controller.dlt);

// GET all salons
router.get('/', address_controller.list);

// GET salon by id
router.get('/:id', address_controller.read);

module.exports = router;
