const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');

const rewardRoutes = require('./api/routes/rewards');
const actionRoutes = require('./api/routes/actions');

app.use(morgan('dev'));     // Log all requests
app.use(cors())             // Enable CORS on all requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/reward-platform', 
            // process.env.ADDRESS + 
            // ':' + process.env.PORT + 
            // '/' +  process.env.DB_NAME,
            { useNewUrlParser: true });



// Routes
router.get('/',  (req, res, next) => {
    res.status(200).json({
        msg : 'It Works!'
    });
});
app.use('/rewards', rewardRoutes);
app.use('/actions', actionRoutes);

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