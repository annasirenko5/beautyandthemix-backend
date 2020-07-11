"use strict";

const Event = require('../models/event');


const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    Event.create(req.body)
        .then(event => res.status(201).json(event))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read   = async (req, res) => {
    Event.findById(req.params.id)
        .populate('service')
        .populate('salon')
        .exec()
        .then(event => {

            if (!event) return res.status(404).json({
                error: 'Not Found',
                message: `Event not found`
            });

            res.status(200).json(event)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};
const update = async(req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    Event.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(event => res.status(200).json(event))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const remove = async(req, res) => {
    Event.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Event with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list  = async(req, res) => {
    Event.find({})
        .populate('service')
        .populate('salon')
        .exec()
        .then(events => res.status(200).json(events))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));

};

const getByService = async(req, res) => {
    try{
        const eventList = await Event.find({service: req.params.service})
            .populate('service')
            .populate('salon')
            .exec();
        if(eventList.length > 0) {
            return res.status(200).json(eventList);
        } else {
            return res.status(500).json({
                error: "Internal server error",
                message: "Events with this service do not exist yet."
            });
        }
    }
    catch (e) {
        return res.status(500).json({
            error: "Internal server error",
            message: e.message
        });
    }
};

module.exports = {
    list,
    create,
    read,
    update,
    remove,
    getByService
};