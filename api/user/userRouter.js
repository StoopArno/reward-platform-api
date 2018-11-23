const express = require('express');
const router = express.Router();
const controller = require('./userController');

router.post('/auth', (req, res, next) => {
    controller.authenticate(req, res);
});

router.get('/search', (req, res, next) => {
    controller.filter(req, res);
});

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
    controller.delete(req, res);
});

router.patch('/:userId',  (req, res, next) => {
    controller.update(req, res);
});

module.exports = router;