var Salon = require('../models/salon');
var Address = require('../models/address');
var Service = require('../models/service');
var Feedback = require('../models/feedback');

const create = async (req, res) => {
    if(Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {
        //convert services to array
        if(!req.body.services instanceof Array) {
            if (typeof req.body.services === 'undefined') {
                req.body.services = [];
            } else req.body.services = new Array(req.body.services);
        }

        let salon = await Salon.create(req.body);

        return res.status(201).json(salon);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let salon = await Salon.findById(req.params.id)
            .populate('location')
            .populate({path: 'services'})
            .populate('reviews')
            .exec();

        if (!salon) return res.status(404).json({
            error: 'Not Found',
            message: 'Salon not found'
        });

        return res.status(200).json(salon)
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
        let salon = await Salon.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec();

        return res.status(200).json(salon);
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const dlt = async (req, res) => {
    try {
        let salon = await Salon.findById(req.params.id);
        console.log(salon);
        await Feedback.find({_id: salon["reviews"]}).exec()
            .then(reviews => {
                for (let i = 0; i < reviews.length; i++) {
                    Feedback.findByIdAndRemove({_id: reviews[i]["_id"]}).exec();
                }
            });
        // if service is removed then all associated events are removed also
        await Service.find({_id: salon["services"]}).exec()
            .then(services => {
                for (let i = 0; i < services.length; i++) {
                    Service.findByIdAndRemove({_id: services[i]["_id"]}).exec();
                }
            });
        await Address.findByIdAndRemove({_id: salon.location}).exec();
        await Salon.findByIdAndRemove({_id: req.params.id}).exec();

        return res.status(200).json({message: 'Salon with id ' + req.params.id + ' was deleted'});
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list = async(req, res) => {
    try{
        let salons = await Salon.find({})
            .populate('location')
            .populate({path: 'services'})
            .populate('reviews')
            .exec();

        return res.status(200).json(salons);
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const addService = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try{
        await Salon.findById(req.params.id).exec()
            .then(salon => {
                    if (salon.services.includes(req.body.services)) {
                        res.status(500).json({
                            error: 'Internal server error',
                            message: "Salon already has this service"
                        })
                    } else {
                        salon.update(req.body).then((upSalon) => {
                                console.log(upSalon);
                                res.status(200).json(upSalon)
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

const addReview = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try{
        await Salon.findById(req.params.id).exec()
            .then(salon => {
                    if (salon.reviews.includes(req.body.reviews)) {
                        res.status(500).json({
                            error: 'Internal server error',
                            message: "Salon already has this review"
                        })
                    } else {
                        salon.update(req.body).then((upSalon) => {
                                console.log(upSalon);
                                res.status(200).json(upSalon)
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

module.exports = {
    create,
    read,
    update,
    dlt,
    list,
    addService,
    addReview
};
