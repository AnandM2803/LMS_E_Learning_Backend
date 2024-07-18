const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
//load .env file
dotenv.config();

const app = express();

// connect to mongoDB
connectDB();

// Use CORS to allow requests from frontend
app.use(cors({ origin: process.env.CORS_ORIGIN }));
const apiRoutes = require('./src/routes/api.routes');
app.use(express.json());

// connect ApiRoutes
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
