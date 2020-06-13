// Require Mongoose
var mongoose = require('mongoose');

// Define a schema
var Schema = mongoose.Schema;


var BankDataSchema = new Schema({
    subsciptionPrice: Number,
    // subscription payment takes place internally within PayPal
    // therefore, only save information whether payment takes place with paypal or credit card (then also save cc data)
    paypal: Boolean
});

// Virtual for bankdata's URL
BankDataSchema
    .virtual('url')
    .get(function () {
        return '/bankdata/' + this._id;
    });

// Export function to create "BankData" model class
module.exports = mongoose.model('BankData', BankDataSchema);
