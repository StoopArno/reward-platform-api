const express = require('express');
const router = express.Router();
const controller = require('./achievementTypeController');

router.get('/',  (req, res, next) => {
    controller.findAll(req, res);
});

router.post('/', (req, res, next) => {
    controller.insert(req, res);
});

router.get('/:achievementTypeId',  (req, res, next) => {
    controller.find(req, res);
});

router.delete('/:achievementTypeId',  (req, res, next) => {
    controller.delete(req, res);
});

router.patch('/:achievementTypeId',  (req, res, next) => {
    controller.update(req, res);
});

module.exports = router;