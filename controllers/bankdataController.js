"use strict";

const BankDataModel = require('../models/bankdata');

const list = async(req, res) => {
    try{
        let bankdata = await BankDataModel.find({}).exec();

        return res.status(200).json(bankdata);
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
        let bankdata = await BankDataModel.create(req.body);
        return res.status(201).json(bankdata)
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let bankdata = await BankDataModel.findById(req.params.id).exec();

        if (!bankdata) return res.status(404).json({
            error: 'Not Found',
            message: `bankdata not found`
        });

        return res.status(200).json(bankdata)
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
        let bankdata = await BankDataModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec();

        return res.status(200).json(bankdata);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const remove = async (req, res) => {
    try {
        await BankDataModel.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: `bankdata with id${req.params.id} was deleted`});
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
