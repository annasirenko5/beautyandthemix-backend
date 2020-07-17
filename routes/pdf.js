var express = require('express');
var router = express.Router();

var pdf_Generator = require('../controllers/pdfGenerator');

// Create pdf
router.post('/', pdf_Generator.createInvoice);

module.exports = router;
