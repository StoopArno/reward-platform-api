const express = require('express');
const router = express.Router();
const controller = require('./rewardController');

router.get('/',  (req, res, next) => {
    controller.findAll(req, res);
});

router.post('/',  (req, res, next) => {
    controller.insert(req, res);
});

router.get('/:challengeId',  (req, res, next) => {
    controller.find(req, res);
});

router.delete('/:challengeId',  (req, res, next) => {
    controller.destroy(req, res);
});

router.patch('/:challengeId',  (req, res, next) => {
    controller.update(req, res);
});

module.exports = router;