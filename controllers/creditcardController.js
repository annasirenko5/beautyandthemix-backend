"use strict";

const CreditCardModel = require('../models/creditcard');

const list = async(req, res) => {
    try{
        let addresses = await CreditCardModel.find({}).exec();

        return res.status(200).json(creditcard);
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};
const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {
        let creditcard = await CreditCardModel.create(req.body);
        return res.status(201).json(creditcard)
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let creditcard = await CreditCardModel.findById(req.params.id).exec();

        if (!creditcard) return res.status(404).json({
            error: 'Not Found',
            message: `creditcard not found`
        });

        return res.status(200).json(creditcard)
    } catch(err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
};

const update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try {
        let creditcard = await CreditCardModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec();

        return res.status(200).json(creditcard);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const remove = async (req, res) => {
    try {
        await CreditCardModel.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: `creditcard with id${req.params.id} was deleted`});
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


module.exports = {
    list,
    create,
    read,
    update,
    remove
};