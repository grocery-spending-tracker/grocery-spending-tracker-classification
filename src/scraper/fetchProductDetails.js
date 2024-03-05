import fs from 'fs';
import * as brand from './brand.js';
import * as name from './name.js';
import * as price from './price.js';
import * as productNumber from './productNumber.js';
import * as image from './image.js';
import util from './util.js';
import logger from '../logger.js';

async function getProductDetails(sku) {
    const cache = util.readCache();

    if (cache[sku]) {
        // console.log('Returning cached details for SKU:', sku);
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
        util.writeCache(cache);

    } catch (error) {
        logger.logError(`Error fetching product details for SKU ${sku}: ${error}`);
    }

    return productDetails;
}

export default getProductDetails;