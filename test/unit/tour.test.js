const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/');
const Chance = require('chance');
const chance = new Chance();

describe('Tours model', () => {
    it('validates a good model', () => {
        const data = {
            title, activities, lanchDate, stops 
        };

        const tour = new Tour(data);
        const jsonTour = tour.toJSON();
        expect(jsonTour).toEqual({ ...data, _id: expect.any(Object) });
    });

    it.skip('event type is required', () => {
        const tour = new Tour({
            //idk what to put here
        });

        const errors = getErrors(tour.validateSync(), 1);
        expect(errors.type.properties.message).toEqual('Path `type` is required.');
    });
});