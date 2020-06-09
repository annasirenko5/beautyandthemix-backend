"use strict";

const Feedback = require('../models/feedback');


const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    Feedback.create(req.body)
        .then(feedback => res.status(201).json(feedback))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read   = async (req, res) => {
    Feedback.findById(req.params.id).exec()
        .then(feedback => {

            if (!feedback) return res.status(404).json({
                error: 'Not Found',
                message: `Movie not found`
            });

            res.status(200).json(feedback)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};


const remove = async(req, res) => {
    Feedback.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Feedback with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list  = async(req, res) => {
    Feedback.find({}).exec()
        .then(feedbacks => res.status(200).json(feedbacks))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

module.exports = {
    create,
    read,
    remove,
    list
};