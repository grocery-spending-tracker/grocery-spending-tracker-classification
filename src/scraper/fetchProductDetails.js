const fs = require('fs');
const fetchBrand = require('./brand');
const fetchName = require('./name');
const fetchPrice = require('./price');
const fetchProductNumber = require('./productNumber');
const fetchImage = require('./image');
const { readCache, writeCache } = require('./util');
const { logError } = require('../logger');

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
        logError(`Error fetching product details for SKU ${sku}: ${error}`); // Use logError for error logging
    }

    return productDetails;
}

if (require.main === module) {
    const inputItem = "06038318640"; // Example SKU

    getProductDetails(inputItem)
        .then(productDetails => console.log(productDetails))
        .catch(error => logError(error)); // Use logError for error logging
}

module.exports = getProductDetails;
