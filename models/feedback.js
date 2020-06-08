var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    stars: {
        type: Number, //changed from integer to number
        min: 0,
        max: 5, //max star rating are 5 stars
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    //additionally added to class diagram
    creationDate: {
        type: Date,
        required: true
    }

});

// Export function to create "Feedback" model class
module.exports = mongoose.model('Feedback', FeedbackSchema);