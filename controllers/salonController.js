var Salon = require('../models/salon');
var Address = require('../models/address');

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
        let salon = await Salon.findById(req.params.id).exec();

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
        // remove address asociated with salon
        await Address.findByIdAndRemove(read(req.params.id).location).exec();
        await Salon.findByIdAndRemove(req.params.id).exec();

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
        let salons = await Salon.find({}).exec();

        return res.status(200).json(salons);
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
