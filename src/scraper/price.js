import puppeteer from 'puppeteer';

/**
 * extracts listed price information from web
 * @param {String} url grocer store web url
 * @returns {String} listed price of product
 */
async function fetchPrice(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const price = await page.evaluate(() => {
        const priceElement = document.querySelector('div.cardPrices span');
        return priceElement ? priceElement.innerText : null;
    });

    await browser.close();
    return price;
}

export {
    fetchPrice
};