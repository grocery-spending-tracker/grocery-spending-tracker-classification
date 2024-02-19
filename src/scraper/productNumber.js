const puppeteer = require('puppeteer');

async function fetchProductNumber(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const productNumber = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a.card-link'));
        const fortinosLink = links.find(link => link.href.includes('fortinos.ca/p/'));
        if (fortinosLink) {
            const match = fortinosLink.href.match(/\/p\/(\d+_EA)/);
            return match ? match[1] : null;
        }
        return null;
    });

    await browser.close();
    return productNumber;
}

module.exports = fetchProductNumber;
