// const fs = require('fs');
// const http = require('https');
// const config = require('../config/config');
// const { parseParquet } = require('../services/dataService');

// const downloadParquetFile = () => {
//     return new Promise((resolve, reject) => {
//         const file = fs.createWriteStream(config.parquet.filePath);
//         http.get(config.parquet.url, (response) => {
//             response.pipe(file);
//             file.on('finish', () => {
//                 file.close(resolve);
//             });
//         }).on('error', (err) => {
//             fs.unlinkSync(config.parquet.filePath); // Delete the file if there's an error
//             reject(err);
//         });
//     });
// };

// const processParquetFile = async () => {
//     try {
//         const data = await parseParquet(config.parquet.filePath);
//         await insertData(data); // Assuming you have a function for inserting data into DB
//     } catch (err) {
//         throw new Error('Error processing Parquet file: ' + err.message);
//     }
// };

// module.exports = { downloadParquetFile, processParquetFile };
const fs = require('fs');
const http = require('https');
const config = require('../config/config');
const { parseParquet } = require('../services/dataService');
const TaxiData = require('../models/taxiData'); // Import your model

const downloadParquetFile = () => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(config.parquet.filePath);
        http.get(config.parquet.url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlinkSync(config.parquet.filePath); // Delete the file if there's an error
            reject(err);
        });
    });
};

const insertData = async (data) => {
    try {
        const taxiData = new TaxiData({
            vendorID: data.vendorID,
            pickupDatetime: data.pickupDatetime,
            dropoffDatetime: data.dropoffDatetime,
            passengerCount: data.passengerCount,
            tripDistance: data.tripDistance,
            rateCode: data.rateCode,
            pulocationID: data.pulocationID,
            dolocationID: data.dolocationID,
            paymentType: data.paymentType,
            fareAmount: data.fareAmount,
        });

        await taxiData.save(); // Save the document to the database
        console.log('Data inserted successfully');
    } catch (err) {
        console.error('Error inserting data:', err);
        throw new Error('Data insertion failed: ' + err.message);
    }
};

const processParquetFile = async () => {
    try {
        const data = await parseParquet(config.parquet.filePath);
        await Promise.all(data.map(insertData)); // Use Promise.all to insert all data concurrently
    } catch (err) {
        throw new Error('Error processing Parquet file: ' + err.message);
    }
};

module.exports = { downloadParquetFile, processParquetFile };
