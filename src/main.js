import classifyItem from './classification/classifyItem.js';
import getProductDetails from './scraper/fetchProductDetails.js';
import { loadProducts, addProduct, extractDecimalNumber } from './classification/util.js'; // Adjust path as needed

async function processItem(item) {
    const products = loadProducts();
    const classifiedItem = await classifyItem([item]);

    if (!classifiedItem) {
        try {
            const details = await getProductDetails(item[0].item_key);
            const productExists = products.some(product => product.product_number === details.product_number);
            if (!productExists) {
                addProduct(details);
                console.log("Added classified product item")
            }

            const scrapedItem = {
                brand: details.brand,
                name: details.name,
                price: item[0].price,
                list_price: extractDecimalNumber(details.price),
                product_number: details.product_number,
                image_url: details.image_url
            };

            return scrapedItem;
        } catch (error) {
            console.error("Failed to scrape product information:", error);
            return null;
        }
    }

    return classifiedItem;
}

export { processItem };