"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config');
const data = require('./data');
const routes = require('./routes');

data.init(config);

const app = express();
app.set('jwtTokenSecret', config.secretKey);

// get an instance of the express Router
const apiRoutes = express.Router();
routes.init(apiRoutes);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(cors());

// register our routes -------------------------------
app.use('/api', apiRoutes);
app.disable('etag');

// if no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(config.port, (err) => {
    if (err)
    {
        console.error(err);
    }
    else
    {
        console.log(`Server is running on http://localhost:${config.port}`);
    }
});