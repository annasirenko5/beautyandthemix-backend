const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const SalonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: "Service"
    }],
    owner_first_name: {
        type: String,
        max: 100
    },
    owner_last_name: {
        type: String,
        max: 100
    },
    owner_phone: {
        type: String,
        match: /^(\+)?[0-9]+/
    },
    logo: {
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Feedback'
    }],
    description: {
        type: String
    }
});

// Export function to create "Salon" model class
module.exports = mongoose.model('Salon', SalonSchema);
