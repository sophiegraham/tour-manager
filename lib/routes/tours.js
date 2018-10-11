const router = require('express').Router();
const Tour = require('../models/Tour');

module.exports = router
    .post('/', (req, res) => {
        const { //idk what goes here } = req.body;
        Tour.create({ title, activities, lanchDate, stops }).then(tour =>
            res.json(tour)
        );
    })

    .get('/', (req, res) => {
        Tour.find().then(tours => res.json(tours));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Tour.findById(id).then(tour => res.json(tour));
    });
