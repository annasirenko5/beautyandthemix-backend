var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        //required: true
    },
    lastName: {
        type: String,
        //required: true
    },
    username: {
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
        //required: true
    },
    bankData: {
        type: Schema.Types.ObjectId,
        ref: 'BankData',
        //required: true
    },
    profilePicture: {
        type: String
    },
    subscription: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription',
        //required: true
    },
    extra_points: {
        type: Number,
        default: 0
    },
    monthly_pay: [{
        name: {
            type: String
        },
        price: {
            type: Number
        }
    }]
});

// Virtual for user's URL
UserSchema
    .virtual('url')
    .get(function () {
        return '/user/' + this._id;
    });

// Export model
module.exports = mongoose.model('User', UserSchema);
