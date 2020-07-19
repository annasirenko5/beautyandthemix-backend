const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Hair', 'Nails', 'Massage', 'Beautician', 'Men'],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salon: {
        type: Schema.Types.ObjectId,
        ref: 'Salon',
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Feedback'
    }]
});

// Export  function to create "Service" model class
module.exports = mongoose.model('Service', ServiceSchema);
