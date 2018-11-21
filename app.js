const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const rewardRoutes = require('./api/reward/rewardRouter');
const challengeRoutes = require('./api/challenge/challengeRouter');
const achievementRoutes = require('./api/achievement/achievementRouter');
const achievementTypeRoutes = require('./api/achievementType/achievementTypeRouter')
const challengeRequestRoutes = require ('./api/challengeRequest/challengeRequestRouter')
const userAchievementRoutes = require ('./api/userAchievement/userAchievementRouter');
const rewardClaimRoutes = require('./api/rewardClaim/rewardClaimRouter');
const userRoutes = require('./api/user/userRouter');

app.use(morgan('dev'));     // Log all requests
app.use(cors())             // Enable CORS on all requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

// Routes
app.use('/rewards', rewardRoutes);
app.use('/challenges', challengeRoutes);
app.use('/achievements', achievementRoutes);
app.use('/achievementTypes', achievementTypeRoutes);
app.use('/challengeRequests', challengeRequestRoutes);
app.use('/userAchievements', userAchievementRoutes);
app.use('/rewardClaims', rewardClaimRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        success: false,
        error: err
    })
});

module.exports = app;