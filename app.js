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
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true, // Allow credentials
}));

const apiRoutes = require('./src/routes/api.routes');
app.use('/uploads', express.static('uploads'));
app.use(express.json());

const authRoutes = require('./src/routes/auth');
const adminRoutes=require('./src/routes/adminauth')
const studentsignupauth=require('./src/routes/studentsignupauth')
const adminsignupauth=require('./src/routes/adminsignupauth')
app.use('/api/auth', authRoutes);
app.use('/api/adminauth',adminRoutes);
app.use('/api/studentsignupauth',studentsignupauth)
app.use('/api/adminsignupauth',adminsignupauth);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
