// Require Mongoose
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
//var extendSchema = require('mongoose-schema-extend');
var BankDataSchema = require('../models//bankdata');

// Define a schema
var Schema = mongoose.Schema;

// use BankData as Base Schema and extend it with CreditCard parameters
 var CreditCardSchema  = BankDataSchema.discriminator('CreditCard', new mongoose.Schema({
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
