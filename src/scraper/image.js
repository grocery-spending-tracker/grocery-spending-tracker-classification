import puppeteer from 'puppeteer';

/**
 * extracts image information from web
 * @param {String} url grocer store web url
 * @returns {String} image url of product
 */
async function fetchImage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    let imageUrl = '';
    try {
        imageUrl = await page.$eval("img.card-img", img => img.src.trim());
    } catch (error) {
        // console.log("Image URL not found");
    }

    await browser.close();
    return imageUrl;
}

export {
    fetchImage
};