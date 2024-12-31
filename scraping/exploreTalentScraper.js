const puppeteer = require('puppeteer');

async function getJobLinks(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('a.heading-link');

  const jobLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a.heading-link'));
    return links.map(link => link.href);
  });

  await browser.close();
  return jobLinks;
}

async function getJobDetails(jobUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(jobUrl, { waitUntil: 'domcontentloaded' });

  await page.waitForSelector('ul.font-semibold');

  const jobDetails = await page.evaluate(() => {
    const details = {};
    const listItems = document.querySelectorAll('ul.font-semibold li');

    listItems.forEach(item => {
      const label = item.childNodes[0]?.textContent.trim().replace(':', '');
      const value = item.querySelector('span')?.textContent.trim();
      if (label && value) {
        details[label] = value;
      }
    });

    const title = document.querySelector('h1.sc-f6fd58da-0')?.textContent.trim() || 'No title';
    const source = 'ExploreTalent';

    return {
      title,
      union: details['Union'] || 'N/A',
      rate: details['Rate/Pay'] || 'N/A',
      posted: details['Posted'] || 'N/A',
      expires: details['Expires'] || 'N/A',
      category: details['Category'] || 'N/A',
      location: details['Dates & Locations'] || 'N/A',
      source: source
    };
  });

  jobDetails.link = jobUrl;
  await browser.close();
  return jobDetails;
}

module.exports = { getJobLinks, getJobDetails };

