const puppeteer = require('puppeteer');

async function getJobLinks(url) {
    const browser = await puppeteer.launch({ headless: true }); //launch a browser window
    const page = await browser.newPage(); //open a new page in the browser
    await page.goto(url, { waitUntil: 'domcontentloaded' }); //open up the given link

    const jobLinks = await page.evaluate(() => {
        //extract all job post links from the page
        const links = Array.from(document.querySelectorAll('a.heading-link')); //update selector
        return links.map(link => link.href); //return the links
    });

    await browser.close(); //close the window
    return jobLinks; //return the links
}

//test the function
getJobLinks('https://www.exploretalent.com/auditions/all-jobs').then(links => {
    console.log(links); //print all the links
})