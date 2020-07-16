var Service = require('../models/service');
var Salon = require('../models/salon');
var Feedback = require('../models/feedback');
var Event = require('../models/event');

const serviceSchema = new Service();

const create = async (req, res) => {
    if(Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {

        let service = await Service.create(req.body);

        let salon = await Salon.update({_id: req.body.salon}, {$push: {services: service._id}});

        return res.status(201).json(service);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let service = await Service.findById(req.params.id)
            .populate('salon')
            .populate('reviews')
            .exec();

        if (!service) return res.status(404).json({
            error: 'Not Found',
            message: 'Service not found'
        });

        return res.status(200).json(service)
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
        let service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec()
        return res.status(200).json(service);
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const dlt = async (req, res) => {
    try {
        // remove data asociated with service
        //remove events for service
        let service = await Service.findById(req.params.id);
        await Event.find({service: service._id}).exec()
            .then(events => {
                events.map((event) => {
                    Event.findByIdAndRemove({_id: event._id}).exec()
                })
            });
        await Feedback.find({_id: service["reviews"]}).exec()
            .then(reviews => {
                for (let i = 0; i < reviews.length; i++) {
                    Feedback.findByIdAndRemove({_id: reviews[i]["_id"]}).exec();
                }
            });
        await Service.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: 'Service with id ' + req.params.id + ' was deleted'});
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: e.message
        });
    }
};

const list = async(req, res) => {
    try{
        let services = await Service.find({})
            .populate('salon')
            .populate('reviews')
            .exec();
        return res.status(200).json(services);
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const addReview = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try{
        await Service.findById(req.params.id).exec()
            .then(service => {
                    if (service.reviews.includes(req.body.reviews)) {
                        res.status(500).json({
                            error: 'Internal server error',
                            message: "Service already has this review"
                        })
                    } else {
                        service.update(req.body).then((upService) => {
                                console.log(upService);
                                res.status(200).json(upService)
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

const getByType = async(req, res) => {
    try{
        const serviceList = await Service.find({type: req.params.type})
            .populate({
                path: 'salon',
                populate: {path: 'location'}
            })
            .populate('reviews')
            .exec();
        if(serviceList.length > 0) {
            return res.status(200).json(serviceList);
        } else {
            return res.status(500).json({
                error: "Internal server error",
                message: "Services with this type do not exist yet."
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

const getTypes = async(req,res) => {
    return res.status(200).json(serviceSchema.schema.path('type').enumValues);
};

const getBySalon = async(req, res) => {
    try {
        // let opts = {};
        const serviceList = await Service.find({salon: req.params.salon}, '_id name');
        // serviceList.map(
        //     (item) => {
        //         if(!opts[item._id]) opts[item._id] ={};
        //         opts[item.id].name = item.name;
        //     });
        if (serviceList.length > 0) {
            return res.status(200).json(serviceList);
        } else {
            return res.status(500).json({
                error: "Internal server error",
                message: "Services with this salon do not exist yet."
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
    update,
    dlt,
    list,
    addReview,
    getByType,
    getTypes,
    getBySalon
};
