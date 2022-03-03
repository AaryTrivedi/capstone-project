// Import dependencies
const jwt = require('jsonwebtoken');

// Import response helper
const httpResponse = require('../helpers/httpResponse');

// Get current env
const env = process.env.NODE_ENV || "development";

// Get config for env
const config = require('../config/config.json')[env];

function generateToken(data) {
    const { JWT_SECRET } = config;
    return jwt.sign(data, JWT_SECRET);
}

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const tokenSecret = config["JWT_SECRET"];

    if (token == null) {
        httpResponse.sendUnauthorized(res, "Token missing");
        console.log('HERE');
        return;
    }

    jwt.verify(token, tokenSecret, (err, user) => {
        if (err) {
            httpResponse.sendUnauthorized(res, "Token not verified");
            return;
        }
        req.user = user
        next()
    })
}

module.exports = {
    generateToken,
    verifyToken
}