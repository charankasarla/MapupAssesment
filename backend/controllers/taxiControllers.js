const TaxiData = require('../models/taxiDataModel');
const { getUserCredentials } = require('../cache/userCache');
const { generateToken } = require('../middleware/authMiddleware');

exports.getTaxiData = async (req, res) => {
    try {
        const taxiData = await TaxiData.find({});
        res.status(200).json(taxiData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = getUserCredentials(username);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.username, user.role);
    res.status(200).json({ token, role: user.role });
};
