//imports
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); //enable dotenv

//connect to the MongoDB database using the URI from the env
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;