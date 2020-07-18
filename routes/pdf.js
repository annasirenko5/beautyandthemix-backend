var express = require('express');
var router = express.Router();

var pdf_Generator = require('../controllers/pdfGenerator');

// Create pdf
router.get('/:id/:month/:year', pdf_Generator.createInvoice);

module.exports = router;
