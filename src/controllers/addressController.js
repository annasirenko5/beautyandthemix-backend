const Address = require('../models/address');

const create = async (req, res) => {
    if(Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {

        let address = await Address.create(req.body);

        return res.status(201).json(address);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let address = await Address.findById(req.params.id).exec();

        if (!address) return res.status(404).json({
            error: 'Not Found',
            message: 'Address not found'
        });

        return res.status(200).json(address)
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
    //update Address?

    try {
        let address = await Address.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec();

        return res.status(200).json(address);
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const dlt = async (req, res) => {
    try {
        await Address.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: 'Address with id ' + req.params.id + ' was deleted'});
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list = async(req, res) => {
    try{
        let addresses = await Address.find({}).exec();

        return res.status(200).json(addresses);
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
