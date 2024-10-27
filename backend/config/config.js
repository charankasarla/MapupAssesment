const dotenv = require('dotenv');

dotenv.config();

const config = {
    db: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
    },
    redis: {
        url: process.env.REDIS_URL,
    },
    parquet: {
        url: process.env.NYC_TRIP_DATA_PARAQUET_FILE_URL,
        filePath: '/Users/pc/Downloads/yellow_tripdata_2023-12.parquet',
    },
    users: {
        admin: {
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
            role: process.env.ADMIN_ROLE,
        },
        manager: {
            username: process.env.MANAGER_USERNAME,
            password: process.env.MANAGER_PASSWORD,
            role: process.env.MANAGER_ROLE,
        },
        user: {
            username: process.env.USER_USERNAME,
            password: process.env.USER_PASSWORD,
            role: process.env.USER_ROLE,
        },
    },
};

module.exports = config;
