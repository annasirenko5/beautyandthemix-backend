// Require Mongoose
const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
//var extendSchema = require('mongoose-schema-extend');
const BankDataSchema = require('../models//bankdata');

// Define a schema
const Schema = mongoose.Schema;

// use BankData as Base Schema and extend it with CreditCard parameters
const CreditCardSchema  = BankDataSchema.discriminator('CreditCard', new mongoose.Schema({
    cardHolderName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
        required: true
    },
    CVC: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    }

}));

// Export function to create "CreditCard" model class
module.exports = mongoose.model('CreditCard');
