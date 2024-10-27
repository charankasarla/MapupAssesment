// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const taxiRoutes = require('./routes/taxiRoutes');
// const { initUserCredentials } = require('./cache/userCache');
// const { downloadParquetFile } = require('./utils/utils');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8080;

// // Middleware
// app.use(express.json());
// app.use('/api/taxi', taxiRoutes);

// // Connect to MongoDB
// mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Successfully connected to MongoDB!');
//         initUserCredentials();
//         downloadParquetFile(); // If you still want to download the Parquet file
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     })
//     .catch(err => {
//         console.error('Database connection error:', err);
//     });

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const userRoutes = require('./routes/userRoutes');
// // const UserCache = require('./cache/userCache');
// // const config = require('./config/config');

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // app.use(express.json());

// // mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.dbName}`, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// // }).then(() => {
// //     console.log('MongoDB connected successfully');
// // }).catch((err) => {
// //     console.error('MongoDB connection error:', err);
// // });

// // app.use('/api', userRoutes);

// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });

// server.js
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const UserCache = require('./cache/userCache');
const config = require('./config/config');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
console.log(process.env.DB_URI)
console.log(PORT)

app.use(express.json());
// console.log(process.env.DB_URI)
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

