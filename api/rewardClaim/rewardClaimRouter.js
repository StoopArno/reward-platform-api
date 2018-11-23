const express = require('express');
const router = express.Router();
const controller = require('./rewardClaimController');

router.get('/search', (req, res, next) => {
    controller.filter(req, res);
});

router.get('/',  (req, res, next) => {
    controller.findAll(req, res);
});

router.post('/',  (req, res, next) => {
    
    controller.insert(req, res);
});

router.get('/:rewardClaimId',  (req, res, next) => {
    controller.find(req, res);
});

router.delete('/:rewardClaimId',  (req, res, next) => {
    controller.delete(req, res);
});

router.patch('/:rewardClaimId',  (req, res, next) => {
    controller.update(req, res);
});

module.exports = router;