var Service = require('../models/servcie');
var Feedback = require('../models/feedback');

const create = async (req, res) => {
    if(Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {

        let service = await Service.create(req.body);

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
        let service = await Service.findById(req.params.id).exec();

        //TODO: read related data from other feedback

        if (!service) return res.status(404).json({
            error: 'Not Found',
            message: 'Service not found'
        });

        return res.status(200).json(service)
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
        let service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec();
        //TODO: update related feedbacks
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
        // remove data asociated with servcice
        //TODO: feedbacks delete
        await Service.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: 'Service with id ' + req.params.id + ' was deleted'});
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list = async(req, res) => {
    try{
        let services = await Service.find({}).exec();
        //TODO: read related data from other collections
        return res.status(200).json(services);
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
