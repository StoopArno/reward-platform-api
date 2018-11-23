const express = require('express');
const router = express.Router();
const controller = require('./rewardClaimController');
const authMiddleware = require ('../../middleware/auth/check-user');

router.get('/search', (req, res, next) => {
    controller.filter(req, res);
});

router.get('/',  (req, res, next) => {
    controller.findAll(req, res);
});

router.post('/', authMiddleware, (req, res, next) => {
    
    controller.insert(req, res);
});

router.get('/:rewardClaimId', (req, res, next) => {
    controller.find(req, res);
});

router.delete('/:rewardClaimId', authMiddleware, (req, res, next) => {
    controller.delete(req, res);
});

router.patch('/:rewardClaimId', authMiddleware, (req, res, next) => {
    controller.update(req, res);
});

module.exports = router;