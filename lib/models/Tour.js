const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    activities: [String],
    launchDate: {
        type: Date
    },
    stops: [{ 
        location: {
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            zip: {
                type: String,
                required: true
            }
        }, 
        weather: {
            temperature: String,
            condition: String
        }, 
        attendance: { 
            type: Number, min: 1 
        } 
    }]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
