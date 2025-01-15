//imports
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

//load environment variables
dotenv.config();

//connect to MongoDB
connectDB();

//Middleware
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL in production
  }));

//Routes
app.use('/api/auditions', require('./routes/auditions'));
app.use('/api/crew-jobs', require('./routes/crewJobs'));
app.use('/api/events', require('./routes/events'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);   
});