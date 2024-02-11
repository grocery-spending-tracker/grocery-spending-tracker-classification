const puppeteer = require('puppeteer');

async function getProductDetails(sku) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    let productDetails = {
        store: "Fortinos",
        brand: null,
        name: null,
        price: null,
        was_price: null,
        product_number: null,
        image_url: null
    };

    try {
        const url = `https://www.fortinos.ca/search?search-bar=${sku}`;
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wrap each attribute extraction in a try-catch
        try {
            productDetails.brand = await page.$eval(".product-name__item--brand", el => el.textContent.trim());
        } catch (error) {
            console.log("Brand not found");
        }

        try {
            productDetails.name = await page.$eval(".product-name__item--name", el => el.textContent.trim());
        } catch (error) {
            console.log("Name not found");
        }

        try {
            productDetails.price = await page.$eval(".selling-price-list__item__price--now-price__value", el => el.textContent.trim());
        } catch (error) {
            console.log("Price not found");
        }

        try {
            const productLink = await page.$(".product-tile__details__info__name__link");
            productDetails.product_number = await page.evaluate(el => el.href.split('/').pop(), productLink);
        } catch (error) {
            console.log("Product link or number not found");
        }

        try {
            productDetails.image_url = await page.$eval(".responsive-image--product-tile-image", img => img.src.trim());
        } catch (error) {
            console.log("Image URL not found");
        }

    } catch (error) {
        console.error(`Error fetching product details for SKU ${sku}:`, error);
    } finally {
        await browser.close();
    }

    return productDetails;
}

module.exports = getProductDetails;
