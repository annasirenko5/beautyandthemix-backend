var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    stars: {
        type: Number, //changed from integer to number
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

    // Virtual for feedback's URL
    FeedbackSchema
        .virtual('url')
        .get(function () {
            return '/feedback/' + this._id;
        });

// Export function to create "Feedback" model class
module.exports = mongoose.model('Feedback', FeedbackSchema);
