const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');

const rewardRoutes = require('./api/reward/rewardRouter');
const challengeRoutes = require('./api/challenge/challengeRouter');

app.use(morgan('dev'));     // Log all requests
app.use(cors())             // Enable CORS on all requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(`mongodb://${process.env.DB_ADDRESS}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true })

// Routes
app.use('/rewards', rewardRoutes);
app.use('/challenges', challengeRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            msg: err.message
        }
    })
});

module.exports = app;