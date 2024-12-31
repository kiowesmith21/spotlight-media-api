const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Audition = require('../models/Audition');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Cleanup Script
async function cleanupDuplicates() {
  try {
    console.log('Starting duplicate cleanup...');
    
    // Group duplicates based on unique criteria (e.g., title and location)
    const duplicates = await Audition.aggregate([
      {
        $group: {
          _id: { title: "$title"}, // 
          ids: { $push: "$_id" }, // Collect all document IDs with the same title and location
          count: { $sum: 1 }, // Count occurrences
        },
      },
      {
        $match: { count: { $gt: 1 } }, // Only keep groups with duplicates
      },
    ]);

    console.log(`Found ${duplicates.length} duplicate groups.`);

    // Remove duplicates
    for (const group of duplicates) {
      const [keep, ...remove] = group.ids; // Keep the first document, remove the rest
      await Audition.deleteMany({ _id: { $in: remove } });
    }

    console.log('Duplicate cleanup complete.');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the cleanup
cleanupDuplicates();
