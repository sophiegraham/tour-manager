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
            zip : {
                type: Number,
                required: true
            }
        }, 
        weather: {
            type: String,
            enum: ['sunny', 'rainy', 'storm'],
            required: true
        }, 
        attendance: { 
            type: Number, min: 1 
        } 
    }]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
