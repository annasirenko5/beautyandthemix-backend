var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
        ref: 'Salon'
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
