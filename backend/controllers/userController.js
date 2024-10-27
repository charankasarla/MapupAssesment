const UserCache = require('../cache/userCache');
const jwtUtils = require('../utils/jwtUtils');
const dataService = require('../services/dataService');

const login = (req, res) => {
    const { username, password } = req.body;

    const user = UserCache.getUserCredentials(username);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwtUtils.generateToken(username, user.role);
    UserCache.setJWTToken(username, token);

    res.json({ token, role: user.role });
};

const getTaxiData = async (req, res) => {
    try {
        const taxiData = await dataService.getTaxiData();
        res.json(taxiData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const ingestData = async (req, res) => {
    try {
        await dataService.processQueue();
        res.status(201).json({ message: 'Data ingestion started' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    login,
    getTaxiData,
    ingestData,
};
