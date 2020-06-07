// Require Mongoose
var mongoose = require('mongoose'),
extend = require('mongoose-schema-extend');

// Define a schema
var Schema = mongoose.Schema;

var CreditCardSchema = BankDataSchema.extend({
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

});

// Virtual for creditcard's URL
CreditCardSchema
    .virtual('url')
    .get(function () {
        return '/creditcard/' + this._id;
    });

// Export function to create "CreditCard" model class
module.exports = mongoose.model('CreditCard', CreditCardSchema);