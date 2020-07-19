const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
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
        ref: 'Address'
    },
    bankData: {
        type: Schema.Types.ObjectId,
        ref: 'BankData'
    },
    profilePicture: {
        type: String
    },
    subscription: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    extra_points: {
        type: Number,
        default: 0
    },
    monthly_pay: [{
        month: {
            type: Date
        },
        items: [{
            name: {
                type: String
            },
            price: {
                type: Number
            }
        }]
    }]
});

// Export function to create "User" model class
module.exports = mongoose.model('User', UserSchema);
