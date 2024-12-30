const puppeteer = require('puppeteer');

async function getJobLinks(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('div.job-block h4 a');

  const jobLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('div.job-block h4 a'));
    return links.map(link => link.href);
  });

  await browser.close();
  return jobLinks;
}

async function getJobDetails(jobUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(jobUrl, { waitUntil: 'domcontentloaded' });

  await page.waitForSelector('ul.job-info');

  const jobDetails = await page.evaluate(() => {
    const details = {};
    const listItems = document.querySelectorAll('ul.job-info li');

    // Grab the text content of the first two <li> elements
    listItems.forEach((item, index) => {
        const value = item.textContent.trim(); // Get the full text content of the <li>

        if (index === 0) { // First list item (location)
            details.location = value;
        } else if (index === 1) { // Second list item (deadline)
            details.deadline = value;
        }
    });

    // Extract rate from the job description
    const jobDescription = document.querySelector('div.job-detail p')?.textContent || ''; // Get the job description text
    const rateMatch = jobDescription.match(/\$\d+[\d,]*/); // Look for text starting with "$" followed by numbers
    if (rateMatch) {
        details.rate = rateMatch[0]; // Store the first match as the rate
    }

    const title = document.querySelector('div.col-lg-10 h4')?.textContent.trim() || 'No title';
    const source = 'CastingT';

    return {
        title,
        union: 'N/A', // Hardcoded for now as union data isn't being extracted
        rate: details.rate || 'N/A',
        posted: 'N/A', 
        expires: details.deadline || 'N/A',
        category: 'N/A', 
        location: details.location || 'N/A',
        source: source
      };
  });

  await browser.close();
  return jobDetails;
}

module.exports = { getJobLinks, getJobDetails };

