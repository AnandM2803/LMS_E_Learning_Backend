const express = require('express');
require('dotenv').config();

// Setup db connection
require('./src/config/db');
// API Routes 
const apiRoutes = require('./src/routes/api.routes');
const app = express();
app.use(express.json());
app.use('/api', apiRoutes); // Corrected from './api' to '/api'
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`My Server is Running at http://localhost:${port}`);
});
