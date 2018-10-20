const express = require('express');
const app = express();
const morgan = require('morgan');
const { handler } = require('./util/errors');
const { HttpError } = require('./util/errors');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

const tours = require('./routes/tours');

app.use('/api/tours', tours);

app.get('/error', (req, res) => {
    throw new HttpError({ code: 505, message: 'my HttpError' });
});

app.use((req, res) => {
    console.log('This is 404');
    res.status(404);
    res.end('404 Not Found');
});

// Error Handler middleware is last!
app.use(handler);

module.exports = app;
