const express = require('express');
const router = express.Router();
const controller = require('./userController');
const authMiddleware = require('../../middleware/auth/check-user');

router.post('/auth', (req, res, next) => {
    controller.authenticate(req, res);
});

router.get('/search', (req, res, next) => {
    controller.filter(req, res);
});

router.get('/', (req, res, next) => {
    controller.findAll(req, res);
});

router.post('/', authMiddleware,  (req, res, next) => {
    controller.insert(req, res);
});

router.get('/:userId',  (req, res, next) => {
    controller.find(req, res);
});

router.delete('/:userId', authMiddleware,  (req, res, next) => {
    controller.delete(req, res);
});

router.patch('/:userId', authMiddleware,  (req, res, next) => {
    controller.update(req, res);
});

module.exports = router;