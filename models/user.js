var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    bankData: {
        type: Schema.Types.ObjectId,
        ref: 'BankData',
        required: true
    },
    profilePicture: {
        type: String
    },
    subscription: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true
    },
});

// Virtual for salon's URL
UserSchema
    .virtual('url')
    .get(function () {
        return '/user/' + this._id;
    });

// Export model
module.exports = mongoose.model('User', UserSchema);
