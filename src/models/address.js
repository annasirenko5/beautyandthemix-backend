// Require Mongoose
const mongoose = require('mongoose');

// Defina a schema
const Schema = mongoose.Schema;

// is address required?
const AddressSchema = new Schema({
    // user as foreign key
    street: String,
    streetnumber: {
        type: String,
        match: /^[0-9]+([a-z])?$/},
    zipcode: Number,
    city: String,
    country: String // probably will have to define countries schema
});

// Virtual for address's URL
AddressSchema
    .virtual('url')
    .get(function () {
        return '/address/' + this._id;
    });

// Export function to create "Address" model class
module.exports = mongoose.model('Address', AddressSchema);


// Usage of the model
// var Address = require('../models/address')
// Find all Address records
// Address.find(callback_function)
