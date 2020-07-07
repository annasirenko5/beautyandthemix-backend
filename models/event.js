var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema({
    // format "dd/MM/yyyy hh:mm TT"
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    timeStart: {
        type: Date ,
        required: true
    },
    booked: {
        type: Boolean,
        required: true
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
