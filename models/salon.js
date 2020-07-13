var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SalonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: "Service"
    }],
    owner_first_name: {
        type: String,
        max: 100
    },
    owner_last_name: {
        type: String,
        max: 100
    },
    owner_phone: {
        type: String,
        match: /^(\+)?[0-9]+/
    },
    logo: {
        data: Buffer,
        contentType: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Feedback'
    }],
    description: {
        type: String
    }
});

// Virtual for owner's full name
SalonSchema
    .virtual('owner_full_name')
    .get(function () {
        var fullname = '';
        if(this.owner_first_name && this.owner_last_name){
            fullname = this.owner_first_name + ' ' + this.owner_first_name;
        }
        return fullname;
    });

// Virtual for salon's URL
SalonSchema
    .virtual('url')
    .get(function () {
        return '/salon/' + this._id;
    });

// Export model
module.exports = mongoose.model('Salon', SalonSchema);
