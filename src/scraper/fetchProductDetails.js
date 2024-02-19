// const fs = require('fs');
// const puppeteer = require('puppeteer');
// const path = require('path');

const fetchBrand = require('./brand');
const fetchName = require('./name');
const fetchPrice = require('./price')
const fetchProductNumber = require('./productNumber');
const fetchImage = require('./image');
const { readCache, writeCache } = require('./scraperUtil');

async function getProductDetails(sku) {
    const cache = readCache();
    if (cache[sku]) {
        console.log('Returning cached details for SKU:', sku);
        return cache[sku];
    }

    const productDetails = { store: "Fortinos", brand: null, name: null, price: null, product_number: null, image_url: null };

    try {
        const url = `https://grocerytracker.ca/search/0067/${sku}`;

        productDetails.brand = await fetchBrand(url);
        productDetails.name = await fetchName(url);
        productDetails.price = await fetchPrice(url);
        productDetails.product_number = await fetchProductNumber(url);
        productDetails.image_url = await fetchImage(url);

        cache[sku] = productDetails;
        writeCache(cache);

    } catch (error) {
        console.error(`Error fetching product details for SKU ${sku}:`, error);
    }

    return productDetails;
}

const inputItem = "06905212968";

getProductDetails(inputItem)
    .then(productDetails => console.log(productDetails))
    .catch(error => console.error(error));

module.exports = getProductDetails;
