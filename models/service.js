const mongoose = require('mongoose');

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

// Virtual for salon's URL
ServiceSchema
    .virtual('url')
    .get(function () {
        return '/service/' + this._id;
    });

// Export model
module.exports = mongoose.model('Service', ServiceSchema);
