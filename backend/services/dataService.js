const mongoose = require('mongoose');
const TaxiData = require('../models/taxiData');
const { downloadParquetFile, processParquetFile } = require('../utils/parquetUtils');

const getTaxiData = async () => {
    return await TaxiData.find({});
};

const processQueue = async () => {
    try {
        await downloadParquetFile();
        await processParquetFile();
    } catch (err) {
        throw new Error('Data ingestion failed: ' + err.message);
    }
};

module.exports = { getTaxiData, processQueue };
