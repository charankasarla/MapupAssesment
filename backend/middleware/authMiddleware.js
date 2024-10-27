const jwt = require('jsonwebtoken');
const UserCache = require('../cache/userCache');
const config = require('../config/config');

const jwtKey = 'your_secret_key'; // Change to a secure key

const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            const user = UserCache.getUserCredentials(decoded.username);
            if (!user || !allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            req.user = { username: decoded.username, role: user.role };
            next();
        });
    };
};

const generateToken = (username, role) => {
    const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour
    const token = jwt.sign({ username, role, exp: expirationTime }, jwtKey);
    return token;
};

module.exports = {
    authMiddleware,
    generateToken,
};
