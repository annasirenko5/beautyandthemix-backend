const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    // format "dd/MM/yyyy hh:mm TT"
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

// Export function to create "Subscription" model class
module.exports = mongoose.model('Event', EventSchema);
