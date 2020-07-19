"use strict";

const Event = require('../models/event');
const Service = require('../models/service');

function hasSame(arr, elem) {
    for(let i=0; i<arr.length; i++) {
        if (arr[i].toString() === elem._id.toString()) return true;
    }
    return false;
}

const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    let evnt = req.body;

    // automatically add salon
    if (evnt.service) {
        await Service.findById(evnt.service).exec().then(
            (service) => {
                evnt.salon = service.salon;
            });
    }

    await Event.create(evnt)
        .then(event => res.status(201).json(event))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read = async (req, res) => {
    Event.findById(req.params.id)
        .populate('service')
        .populate('salon')
        .populate({
            path:'salon',
            populate:{
                path:'location'
            }
        })
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
const update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).exec()
        .then(event => res.status(200).json(event))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const remove = async (req, res) => {
    Event.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Event with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list = async (req, res) => {
    Event.find({})
        .populate('service')
        .populate('salon')
        .populate({
            path:'salon',
            populate:{
                path:'location'
            }
        })
        .exec()
        .then(events => res.status(200).json(events))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));

};

const getByService = async (req, res) => {
    try {
        const eventList = await Event.find({service: req.params.service})
            .populate('service')
            .populate('salon')
            .exec();
        if (eventList.length > 0) {
            return res.status(200).json(eventList);
        } else {
            return res.status(404).json({
                error: "Empty List",
                message: "Events with this service do not exist yet."
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: "Internal server error",
            message: e.message
        });
    }
};

const getFreeDates = async (req, res) => {
    try {
        let resp = {};

        const events = await Event.find({booked: false});

        for (let i = 0; i < events.length; i++) {

            let currDate = events[i].timeStart.getFullYear() + "-" + Number(events[i].timeStart.getMonth() + 1) + "-" + events[i].timeStart.getDate();
            if (!resp[currDate]) resp[currDate] = {};

            await Service.findOne({_id: events[i].service}).then((service) => {
                if (!resp[currDate][service.type]) resp[currDate][service.type] = [];

                if(!hasSame(resp[currDate][service.type], service)) {
                    resp[currDate][service.type] = resp[currDate][service.type].concat(service._id);
                }
            });
            if (i === events.length - 1) {
                return res.status(200).json(resp);
            }
        }
    } catch (e) {
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
    getByService,
    getFreeDates
};
