var User = require('../models/user');
var Address = require('../models/address');
var Event = require('../models/event');
var BankData = require('../models/bankdata');
var Subscription = require('../models/subscription');

const create = async (req, res) => {
    if(Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {

        let user = await User.create(req.body);

        return res.status(201).json(user);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
            .populate('address')
            .populate('bankData')
            .populate('bookings')
            .populate('subscription')
            .exec();

        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: 'User not found'
        });

        return res.status(200).json(user)
    } catch (e) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
};

const update = async (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try {
        let user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec();
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const dlt = async (req, res) => {
    try {

        await User.findByIdAndRemove(req.params.id).exec()
            .then(user => {
                Address.findByIdAndRemove({_id: user.address}).exec();
                BankData.findByIdAndRemove({_id: user.bankData}).exec();
                Subscription.findByIdAndRemove({_id: user.subscription}).exec();
                Event.find({_id: user["bookings"]}).exec()
                    .then(bookings => {
                        for (let i = 0; i < bookings.length; i++) {
                            Event.findByIdAndRemove({_id: bookings[i]["_id"]}).exec();
                        }
                    })
            })
        
        return res.status(200).json({message: 'User with id ' + req.params.id + ' was deleted'});
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list = async(req, res) => {
    try{
        let users = await User.find({})
            .populate('address')
            .populate('bankData')
            .populate('bookings')
            .populate('subscription')
            .exec();
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const addBooking = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try{
        await User.findById(req.params.id).exec()
            .then(user => {
                    if (user.bookings.includes(req.body.bookings)) {
                        res.status(500).json({
                            error: 'Internal server error',
                            message: "User already has this booking"
                        })
                    } else {
                        user.update(req.body).then((upUser) => {
                                console.log(upUser);
                                res.status(200).json(upUser)
                            }
                        ).catch((err) => console.log(err.message));
                    }
                }
            )
    }
    catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }

};

module.exports = {
    create,
    read,
    update,
    dlt,
    list,
    addBooking
};