/* Adds sample data to database  */

// Usage
// Step 1: npm install async
// Step 2: node populatedb '<bntm_database_url>'

//#! /usr/bin/env node

console.log('This script populates some test addresses, bankdatainstances and credircard to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Address = require('./models/address')
var BankData = require('./models/bankdata')
//var CreditCard = require('./models/creditcard')
var Salon = require('./models/salon')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var addresses = [];
var bankdata = [];
var creditcards = [];
var salons = [];

function addressCreate(street, streetnumber, zipcode, city, country, cb) {
    addressdetail = {street:street , streetnumber:streetnumber,
    zipcode:zipcode, city:city, country:country}

    var address = new Address(addressdetail);

    address.save(function (err) {
        if (err) {
            console.log(err)
            return
        }
        console.log('New Address: ' + address);
        addresses.push(address);
        //cb(null, address)
    }  );
}

function createAddresses(cb) {
    // series fuert in der bestimmten reihenfolge aus
    // parallel alles auf einmal und dann waits
    async.series([
            function(callback) {
                addressCreate('Landsbergerstraße', '503a', 123456, 'Munich', 'Germany')
            },
            function(callback) {
                addressCreate('Rosenstrasse', '11', 123456, 'Munich', 'Germany')
            },
            function(callback) {
                addressCreate('Leopoldstrasse', '202', 123456, 'Munich', 'Germany')
            },
        ],
        // optional callback
        cb);
}

async.series([
        createAddresses,
    ],
// Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('Instances: '+addresses);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });



