"use strict";

const express = require('express');
const router = express.Router();

const pdf_Generator = require('../controllers/pdfGenerator');

// CREATE pdf
router.get('/:id/:month/:year', pdf_Generator.createInvoice);

module.exports = router;
