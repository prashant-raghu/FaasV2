const jwt = require('jsonwebtoken');
const config = require('../environments/index');

exports.encode = (userId) => {
    const auth = `bearer ${jwt.sign(userId, config.auth.jwtSecret)}`;
    return auth;
};

exports.decode = (token) => {
    return decoded = jwt.verify(token.split(' ')[1], config.auth.jwtSecret);
};