// const { dropCollection } = require('./db');
// const request = require('supertest');
// const app = require('../../lib/app');
// const Chance = require('chance');
// const chance = new Chance();

// describe('tour pub/sub API', () => {
//     let tours = Array.apply(null, { length: 30 }).map(() => {
//         return {
//             tourID: chance.guid({ version: 4 }),
//             title: 'purchase',
//             activities: ,
//             launchDate: ,
//             stops:
//         };
//     });
//     let createdTours;

//     const createTour = tour => {
//         return request(app)
//             .post('/api/tours')
//             .send(tour)
//             .then(res => res.body);
//     };

//     beforeEach(() => {
//         return dropCollection('tours');
//     });

//     beforeEach(() => {
//         return Promise.all(tours.map(createTour)).then(toursRes => {
//             createdTours = toursRes;
//         });
//     });

//     it('creates a tour on post', () => {
//         return request(app)
//             .post('/api/tours')
//             .send({
//                 customerId: '1234',
//                 title: 'purchase',
//                 activities: '5678',
//                 launchDate: ,
//                 stops
//             })
//             .then(res => {
//                 expect(res.body).toEqual({
//                     _id: expect.any(String),
//                     __v: expect.any(Number),
//                     title: 'purchase',
//                     activities: '5678',
//                     launchDate: ,
//                     stops
//                 });
//             });
//     });

