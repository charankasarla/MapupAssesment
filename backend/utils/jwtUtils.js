const jwt = require('jsonwebtoken');

const jwtKey = 'your_secret_key'; // Change to a secure key

const generateToken = (username, role) => {
    const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour
    const token = jwt.sign({ username, role, exp: expirationTime }, jwtKey);
    return token;
};

module.exports = { generateToken };
