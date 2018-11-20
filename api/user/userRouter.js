const express = require('express');
const router = express.Router();
const controller = require('./userController');

router.get('/',  (req, res, next) => {
    controller.findAll(req, res);
});

router.post('/',  (req, res, next) => {
    controller.insert(req, res);
});

router.get('/:userId',  (req, res, next) => {
    controller.find(req, res);
});

router.delete('/:userId',  (req, res, next) => {
    controller.destroy(req, res);
});

router.patch('/:userId',  (req, res, next) => {
    controller.update(req, res);
});

module.exports = router;