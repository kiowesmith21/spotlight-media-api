//Audition schema
const Audition = require('../models/Audition');
//scrapers per website
const exploreTalentScraper = require('./exploreTalentScraper');
const castingTScraper = require('./castingTScraper');
const playBillScraper = require('./playBillScraper');

//UN-COMMENT WHEN ADDING TO DB
const mongoose = require('mongoose');

//load environment variables
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Function to scrape job details and save to MongoDB
async function scrapeAndSaveJobs() {
    // Scrape from ExploreTalent
    const exploreTalentLinks = await exploreTalentScraper.getJobLinks('https://www.exploretalent.com/auditions/all-jobs');  // Get all job links from the main page
  
    for (const link of exploreTalentLinks) {
      const jobDetails = await exploreTalentScraper.getJobDetails(link);  // Get job details for each job
      const newAudition = new Audition(jobDetails);  // Create a new Job document
      await newAudition.save();  // Save the job to MongoDB
      
      console.log(`Saved job: ${jobDetails.title}`);
    }

    // Scrape from CastingT
    // const castingTLinks = await castingTScraper.getJobLinks('https://castingt.com/auditions');
    // for (const link of castingTLinks) {
    //     const jobDetails = await castingTScraper.getJobDetails(link);
    //     //TESTING
    //     const newAudition = new Audition(jobDetails);
    //     await newAudition.save();
    //     // console.log(`Saved job from CastingT: ${jobDetails.title}`);
    //     //TESTING
    //     // console.log('saved details: ', jobDetails);
    // }

    // Scrape from Playbill
    // const playBillLinks = await playBillScraper.getJobLinks('https://playbill.com/jobs');
    // for (const link of playBillLinks) {
    //     const jobDetails = await playBillScraper.getJobDetails(link);
    //     //TESTING
    //     const newAudition = new Audition(jobDetails);
    //     await newAudition.save();
    //     // console.log(`Saved job from Playbill: ${jobDetails.title}`);
    //     //TESTING
    //     // console.log('saved details: ', jobDetails);
    // }

    //scrape from more websites if desired...

  }
  
scrapeAndSaveJobs()
.then(() => console.log('Job scraping and saving complete'))
.catch((err) => console.error('Error scraping and saving jobs:', err));