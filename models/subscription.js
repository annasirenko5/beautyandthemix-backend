var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubscriptionSchema = new Schema({
    points: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration_start: {
        type: Date,
        required: true
    },
    duration_end: {
        type: Date,
        required: true
    },
    cancel: {
        type: Boolean,
        required: true
    }
});

// Export function to create "Subscription" model class
module.exports = mongoose.model('Subscription', SubscriptionSchema);