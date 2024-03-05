import fs from 'fs';
import * as brand from './brand.js';
import * as name from './name.js';
import * as price from './price.js';
import * as productNumber from './productNumber.js';
import * as image from './image.js';
import { readCache, writeCache } from './util.js';
import { logError } from '../logger.js';

async function getProductDetails(sku) {
    const cache = readCache();
    if (cache[sku]) {
        console.log('Returning cached details for SKU:', sku);
        return cache[sku];
    }

    const productDetails = { store: "Fortinos", brand: null, name: null, price: null, product_number: null, image_url: null };

    try {
        const url = `https://grocerytracker.ca/search/0067/${sku}`;

        productDetails.brand = await brand.fetchBrand(url);
        productDetails.name = await name.fetchName(url);
        productDetails.price = await price.fetchPrice(url);
        productDetails.product_number = await productNumber.fetchProductNumber(url);
        productDetails.image_url = await image.fetchImage(url);

        cache[sku] = productDetails;
        writeCache(cache);

    } catch (error) {
        logError(`Error fetching product details for SKU ${sku}: ${error}`);
    }

    return productDetails;
}

export default getProductDetails;