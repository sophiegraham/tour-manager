require('dotenv').config();
const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../lib/app');
// const Chance = require('chance');
// const chance = new Chance();

describe('tour pub/sub API', () => {
    let tours = Array.apply(null, { length: 1 }).map(() => {
        return {
            title: 'best circus',
            activities: ['juggling', 'trapeze', 'animal abuse'],
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

    it('creates a tour on post', () => {
        return request(app)
            .post('/api/tours')
            .send(tours[0])
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    launchDate: expect.any(String),
                    ...tours[0]
                });
            });
    });

    it('gets all tours', () => {
        return request(app)
            .get('/api/tours')
            .then(res => {
                expect(res.body).toEqual(createdTours);
            });
    });

    it('gets tour by id', () => {
        return request(app)
            .get(`/api/tours/${createdTours[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdTours[0]);
            });
    });

    it.skip('posts a new stop on the tour', () => {
        return request(app)
            .post(`/api/tours/${createdTours[0]._id}/stops`)
            .send({ zip: '97229' })
            .then(res => {
                expect(res.body.stops).toEqual([{
                    _id: expect.any(String),
                    location: {
                        city: 'portland',
                        state: 'OR',
                        zip: '97229'
                    },
                    weather: {
                        temperature: expect.any(String),
                        condition: expect.any(String)
                    }
                }]);
            });
    });
});
