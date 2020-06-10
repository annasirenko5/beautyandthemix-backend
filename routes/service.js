var express = require('express');
var router = express.Router();

var service_controller = require('../controllers/serviceController');

// Create service
router.post('/create', service_controller.create);

// Update service
router.put('/:id/update', service_controller.update);

// Delete service
router.delete('/:id/delete', service_controller.dlt);

// GET all services
router.get('/', service_controller.list);

// GET service by id
router.get('/:id', service_controller.read);

module.exports = router;
