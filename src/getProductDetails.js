const puppeteer = require('puppeteer');


async function getProductDetails(sku) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        const storeName = "Fortinos";

        const url = `https://www.fortinos.ca/search?search-bar=${sku}`;
        await page.goto(url, { waitUntil: 'networkidle2' });

        const productBrand = await page.$eval(".product-name__item--brand", el => el.textContent.trim());
        const productName = await page.$eval(".product-name__item--name", el => el.textContent.trim());
        const productPrice = await page.$eval(".selling-price-list__item__price--now-price__value", el => el.textContent.trim());
        const productLink = await page.$(".product-tile__details__info__name__link");
        const productHref = await page.evaluate(el => el.href, productLink);
        const productHrefLastSection = productHref.split('/').pop();
        const productImage = await page.$eval(".responsive-image--product-tile-image", img => img.src.trim());

        return {
            store: storeName,
            brand: productBrand,
            name: productName,
            price: productPrice,
            was_price: null,
            product_number: productHrefLastSection,
            image_url: productImage
        };
    } catch (error) {
        console.error(`Error fetching product details for SKU ${sku}:`, error);
        throw error;
    } finally {
        await browser.close();
    }
}


module.exports = getProductDetails;
