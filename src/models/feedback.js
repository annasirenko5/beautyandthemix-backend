const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    stars: {
        type: Number,
        min: 0,
        max: 5, //max star rating are 5 stars
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    //additionally added to class diagram
    creationDate: {
        type: Date,
        required: true
    },
    by_user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    salon: {
        type: Schema.Types.ObjectId,
        ref: 'Salon'
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }

});

// Export function to create "Feedback" model class
module.exports = mongoose.model('Feedback', FeedbackSchema);
