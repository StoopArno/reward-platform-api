const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(decoded.isAdmin == true){
            req.userData = decoded;
            next();
        } else {
            throw error;
        }        
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};