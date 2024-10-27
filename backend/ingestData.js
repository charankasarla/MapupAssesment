const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { downloadParquetFile, processParquetFile } = require('./utils/parquetUtils');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

const main = async () => {
    await connectDB();

    try {
        // Step 1: Download the Parquet file
        await downloadParquetFile();
        console.log('Parquet file downloaded');

        // Step 2: Process and ingest the Parquet file
        await processParquetFile();
        console.log('Data ingested successfully');
    } catch (error) {
        console.error('Error during ingestion:', error);
    } finally {
        // Optional: Close the MongoDB connection when done
        await mongoose.connection.close();
    }
};

main();
