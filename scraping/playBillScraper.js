const puppeteer = require('puppeteer');

async function getJobLinks(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('div.pb-tile-wrapper a');

  const jobLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('div.pb-tile-wrapper a'));
    return links.map(link => link.href);
  });

  await browser.close();
  return jobLinks;
}

async function getJobDetails(jobUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(jobUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

  await page.waitForSelector('div.pb-tile-title');

  const jobDetails = await page.evaluate(() => {
    const details = {};

     // Select the second section inside the div.jobs-detail
     const secondSection = document.querySelectorAll('div.jobs-detail section')[1];
     let rate = 'N/A';
 
     if (secondSection) {
       // Extract all <p> tags within the second section
       const paragraphs = secondSection.querySelectorAll('p');
 
       // Loop through <p> tags to find the one with the rate
       paragraphs.forEach(p => {
         const text = p.textContent || '';
         if (text.includes('$')) {
           const rateMatch = text.match(/\$\d+[\d,]*/); // Look for text starting with "$" followed by numbers
           if (rateMatch) {
             rate = rateMatch[0];
           }
         }
       });
     }
 
    details.rate = rate;

    //get the location
    // Scrape the location text
    let locationText = document.querySelector('div.jobs-detail section p').textContent.trim();

    // Add a comma if one is missing
    if (!locationText.includes(',')) {
        let parts = locationText.split(' ');
        if (parts.length >= 2) {
            // Assume the last part is the country and add a comma before it
            locationText = parts.slice(0, -1).join(' ') + ', ' + parts[parts.length - 1];
        }
    }

    details.location = locationText;


    const title = document.querySelector('h2.jobs-page-title')?.textContent.trim() || 'No title';

    return {
        title,
        union: 'N/A', // Hardcoded for now as union data isn't being extracted
        rate: details.rate || 'N/A',
        posted: 'N/A', 
        expires: details.deadline || 'N/A',
        category: 'N/A', 
        location: details.location || 'N/A',
        source: 'Playbill'
      };
  });

  jobDetails.link = jobUrl;
  await browser.close();
  return jobDetails;
}

module.exports = { getJobLinks, getJobDetails };

