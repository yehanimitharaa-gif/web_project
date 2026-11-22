const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./database'); // SQLite connection එක load කරයි
const { handleGetDashboardStats } = require('./service/statsService');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/courses', require('./routes/courseRoutes'));
app.get('/api/dashboard/stats', handleGetDashboardStats);
app.get('/api/stats', handleGetDashboardStats);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SQL Backend Server running on port ${PORT}`);
});