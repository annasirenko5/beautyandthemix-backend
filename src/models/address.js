const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    streetnumber: {
        type: String,
        match: /^[0-9]+([a-z])?$/
    },
    zipcode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

// Export function to create "Address" model class
module.exports = mongoose.model('Address', AddressSchema);

