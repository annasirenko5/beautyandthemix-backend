// Require Mongoose
var mongoose = require('mongoose');

// Define a schema
var Schema = mongoose.Schema;


var BankDataSchema = new Schema({
    subsciptionPrice: Number
    }
);

// Virtual for bankdata's URL
BankDataSchema
    .virtual('url')
    .get(function () {
        return '/bankdata/' + this._id;
    });

// Export function to create "BankData" model class
module.exports = mongoose.model('BankData', BankDataSchema);