import puppeteer from 'puppeteer';

/**
 * extracts brand information from web
 * @param {String} url grocer store web url
 * @returns {String} brand of product
 */
async function fetchBrand(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const brand = await page.evaluate(() => {
        const brandElement = document.querySelector('.card-subtitle');
        return brandElement ? brandElement.innerText : null;
    });

    await browser.close();
    return brand;
}

export {
    fetchBrand
};