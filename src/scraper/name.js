import puppeteer from 'puppeteer';

async function fetchName(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const name = await page.evaluate(() => {
        const nameElement = document.querySelector('.card-title');
        return nameElement ? nameElement.innerText : null;
    });

    await browser.close();
    return name;
}

export default fetchName;