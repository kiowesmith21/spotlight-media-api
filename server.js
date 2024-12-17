//imports
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

//load environment variables
dotenv.config();

//connect to MongoDB
connectDB();

//Middleware
const app = express();
app.use(express.json());

//Routes
app.use('/api/auditions', require('./routes/auditions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);   
});