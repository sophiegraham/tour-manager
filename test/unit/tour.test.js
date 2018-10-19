const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/Tour');

describe('Tours model', () => {
    it('validates a good model', () => {
        const stop = { 
            location: {
                city: 'portland',
                state: 'oregon',
                zip: '97205'
            },
            weather: {
                temperature: '70',
                condition: 'raining'
            },
            attendance: 250
        };

        const data = {
            title: 'best circus',
            activities: ['juggling', 'trapeze', 'animal abuse'],
            launchDate: new Date(),
            stops:[stop] 
        };

        const tour = new Tour(data);
        const jsonTour = tour.toJSON();
        expect(jsonTour).toEqual({ ...data, _id: expect.any(Object), stops:[{ ...stop, _id:expect.any(Object) }] });
    });

    it('event type is required', () => {
        const tour = new Tour({});

        const errors = getErrors(tour.validateSync(), 1);
        expect(errors.title.kind).toEqual('required');
    });
});
