const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../lib/app');

describe('tour pub/sub API', () => {
    let tours = Array.apply(null, { length: 30 }).map(() => {
        return {
            title: 'best circus',
            activities: ['juggling', 'trapeze', 'animal abuse'],
            launchDate: new Date(),
            stops:[]
        };
    });
    let createdTours;

    const createTour = tour => {
        return request(app)
            .post('/api/tours')
            .send(tour)
            .then(res => res.body);
    };

    beforeEach(() => {
        return dropCollection('tours');
    });

    beforeEach(() => {
        return Promise.all(tours.map(createTour)).then(toursRes => {
            createdTours = toursRes;
        });
    });

    it.skip('creates a tour on post', () => {
        return request(app)
            .post('/api/tours')
            .send(createdTours[0])
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    ...createdTours[0]
                });
            });
    });
});
