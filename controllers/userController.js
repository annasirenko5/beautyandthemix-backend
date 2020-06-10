var User = require('../models/user');
var Address = require('../models/address');
var Event = require('../models/event');
var BankData = require('../models/bankdata')

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
        let user = await User.findById(req.params.id).exec();

        //TODO: read related data from other collections

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
        //TODO: update related data from other collections
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
        // remove data asociated with user
        await Address.findByIdAndRemove(read(req.params.id).address).exec();
        await BankData.findByIdAndRemove(read(req.params.id).bankData).exec();
        //TODO: bookings delete
        await User.findByIdAndRemove(req.params.id).exec();

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
        let users = await User.find({}).exec();
        //TODO: read related data from other collections
        return res.status(200).json(users);
    } catch (e) {
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
    list
};
