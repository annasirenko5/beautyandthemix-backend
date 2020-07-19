const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    timeStart: {
        type: Date ,
        required: true
    },
    booked: {
        type: Boolean,
        default: false
    },
    worker: {
        type: String,
        required: true
    },
    salon: {
        type: Schema.Types.ObjectId,
        ref: 'Salon'
    }
});

// Export function to create "Event" model class
module.exports = mongoose.model('Event', EventSchema);
