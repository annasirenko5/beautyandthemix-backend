"use strict";

const Feedback = require('../models/feedback');
const Service = require('../models/service');
const Salon = require('../models/salon');


const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    let feedback = req.body;

    if(feedback.service) {
        await Service.findById(feedback.service).exec().then(
            (service) => {
                feedback.salon = service.salon;
            });
    }

    await Feedback.create(req.body)
        .then((feedback) => {
            Salon.update({_id: feedback.salon}, {$push: {reviews: feedback._id}});
            res.status(201).json(feedback)
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read   = async (req, res) => {
    Feedback.findById(req.params.id)
        .populate('by_user')
        .populate('service')
        .exec()
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
    Feedback.find({})
        .populate('by_user')
        .populate('service')
        .exec()
        .then(feedbacks => res.status(200).json(feedbacks))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const bySalon = async(req, res) => {
    try {
        const feedbackList = await Feedback.find({salon: req.params.salon})
            .populate('service')
            .populate('by_user')
            .exec();
        if (feedbackList.length > 0) {
            return res.status(200).json(feedbackList);
        } else {
            return res.status(500).json({
                error: "Internal server error",
                message: "Feedbacks with this salon do not exist yet."
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: "Internal server error",
            message: e.message
        });
    }
};

const avgReviews  = async (req, res) => {
    try {
        const avgreviewList = await Feedback.aggregate(
            [
                {
                    $group:
                        {
                            _id: "$salon",
                            avgReviews: {$avg : "$stars"}
                        }
                },
                {
                    $lookup: {  //another way to populate salon informations
                        from: Salon.collection.name,
                        localField: '_id',
                        foreignField:'_id',
                        as:'salon'
                    }
                },
                { $sort: { "avgReviews": -1 } }
            ]

        )
            .exec();
        if (avgreviewList.length > 0) {
            return res.status(200).json(avgreviewList);
        } else {
            return res.status(500).json({
                error: "Internal server error",
                message: "Feedbacks with this salon do not exist yet."
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: "Internal server error",
            message: e.message
        });
    }
};

module.exports = {
    create,
    read,
    remove,
    list,
    bySalon,
    AvgReviews: avgReviews
};
