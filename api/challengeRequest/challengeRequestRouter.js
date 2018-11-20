const express = require('express');
const router = express.Router();
const controller = require('./challengeRequestController');

router.get('/',  (req, res, next) => {
    controller.findAll(req, res);
});

router.post('/', (req, res, next) => {
    controller.insert(req, res);
});

router.get('/:challengeRequestId',  (req, res, next) => {
    controller.find(req, res);
});

router.delete('/:challengeRequestId',  (req, res, next) => {
    controller.delete(req, res);
});

router.patch('/:challengeRequestId',  (req, res, next) => {
    controller.update(req, res);
});

module.exports = router;