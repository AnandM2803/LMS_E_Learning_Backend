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

app.use('/uploads', express.static('uploads'));
app.use(express.json());

const apiRoutes = require('./src/routes/api.routes');
const studentLogin = require('./src/routes/auth');
const adminLogin=require('./src/routes/adminauth')
const instructorLogin=require('./src/routes/instructorauth')
const studentsignupauth=require('./src/routes/studentsignupauth')
const adminsignupauth=require('./src/routes/adminsignupauth')



app.use('/api/auth', studentLogin);
app.use('/api/adminauth',adminLogin);
app.use('/api/instructorauth',instructorLogin);
app.use('/api/studentsignupauth',studentsignupauth)
app.use('/api/adminsignupauth',adminsignupauth);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
