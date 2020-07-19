const User = require('../models/user');
const Address = require('../models/address');
const Event = require('../models/event');
const Subscription = require('../models/subscription');

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
            .populate({path: 'bookings', populate: {path: 'service'}})
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
            message: e.message
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
        let usr = await User.findById(req.params.id);
        let upd = req.body;

        if(!req.body.cancelBook) {

            if (upd.extra_points) {
                upd.extra_points = usr.extra_points + upd.extra_points;
            }

            if(upd.bookings !== undefined) {
                upd.bookings = Array.prototype.concat(upd.bookings, usr.bookings);
            }

        }

        if(upd.monthly_pay) {
            if (upd.monthly_pay[0].items) {
                //check if user already has a payment entry
                if (usr.monthly_pay.length > 0) {
                    //concating the item from the request with items from latest payment in user
                    let newItems = Array.prototype.concat(upd.monthly_pay[0].items, usr.monthly_pay[0].items)
                    let mntPay = {
                        _id: usr.monthly_pay[0]._id,
                        month: usr.monthly_pay[0].month,
                        items: newItems
                    }
                    //concating old payment entry with newly added item with old payments
                    upd.monthly_pay = Array.prototype.concat(mntPay, usr.monthly_pay.splice(1, usr.monthly_pay.length))
                }else if(upd.monthly_pay[0].month === undefined){
                    upd.monthly_pay[0].month = new Date();
                }
            }
        }


        let user = await User.findByIdAndUpdate(req.params.id, upd, {
            new: true,
            runValidators: true
        }).exec();
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: e.message
        });
    }
};

const dlt = async (req, res) => {
    try {

        await User.findByIdAndRemove(req.params.id).exec()
            .then(user => {
                Address.findByIdAndRemove({_id: user.address}).exec();
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
            .populate({path: 'bookings', populate: {path: 'service'}})
            .populate('address')
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
