const express = require('express');
const router = express.Router();

router.get('/',  (req, res, next) => {
    res.status(200).json({
        msg : 'Fetched all actions'
    });
});

router.post('/',  (req, res, next) => {
    const action = {
        description: req.body.description,
        date: req.body.date,
        userId: req.body.userId
    }
    res.status(201).json({
        msg: 'Created new action',
        action: action
    });
});

router.get('/:actionId',  (req, res, next) => {
    const id = req.params.actionId;
    retVal = null;
    
    res.status(200).json({
        msg : 'Fetched specific action',
        id : id
    });
});

router.delete('/:actionId',  (req, res, next) => {
    res.status(200).json({
        msg : 'Deleted action!'
    });
});

router.patch('/:actionId',  (req, res, next) => {
    res.status(200).json({
        msg : 'Updated action'
    });
});


module.exports = router;