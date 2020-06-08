var express = require('express');
var router = express.Router();

var salon_controller = require('../controllers/salonController');

// Create salon
router.post('/create', salon_controller.create);

// Update salon
router.put('/:id/update', salon_controller.update);

// Delete salon
router.delete('/:id/delete', salon_controller.dlt);

// GET all salons
router.get('/', salon_controller.list);

// GET salon by id
router.get('/:id', salon_controller.read);

module.exports = router;
