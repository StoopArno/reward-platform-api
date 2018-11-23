const express = require('express');
const router = express.Router();
const controller = require('./rewardController');

router.get('/search', (req, res, next) => {
    controller.filter(req, res);
});

router.get('/',  (req, res, next) => {
    controller.findAll(req, res);
});

router.post('/',  (req, res, next) => {
    controller.insert(req, res);
});

router.get('/:rewardId',  (req, res, next) => {
    controller.find(req, res);
});

router.delete('/:rewardId',  (req, res, next) => {
    controller.delete(req, res);
});

router.patch('/:rewardId',  (req, res, next) => {
    controller.update(req, res);
});

module.exports = router;