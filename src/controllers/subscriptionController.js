"use strict";

const Subscription = require('../models/subscription');


const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    Subscription.create(req.body)
        .then(subscription => res.status(201).json(subscription))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read   = async (req, res) => {
    Subscription.findById(req.params.id).exec()
        .then(subscription => {
            if (!subscription) return res.status(404).json({
                error: 'Not Found',
                message: `Movie not found`
            });

            res.status(200).json(subscription)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};


const remove = async(req, res) => {
    Subscription.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Subscription with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list  = async(req, res) => {
    Subscription.find({}).exec()
        .then(subscriptions => res.status(200).json(subscriptions))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const update = async (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try {
        let subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec()
        return res.status(200).json(subscription);
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
    remove,
    list,
    update
};