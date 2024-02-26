import classifyItem from './classification/classifyItem.js';
import getProductDetails from './scraper/fetchProductDetails.js';
import { loadProducts, addProduct, extractDecimalNumber } from './classification/util.js'; // Adjust path as needed

async function processItem(items) {
    const products = loadProducts();    
    const processedItems = []; // Initialize an array to hold processed items

    for (const item of items) {
        const classifiedItem = await classifyItem([item]);

        if (!classifiedItem) {
            try {
                const details = await getProductDetails(item.item_key);
                const productExists = products.some(product => product.product_number === details.product_number);
                if (!productExists) {
                    addProduct(details);
                    console.log("Added classified product item")
                }

                const scrapedItem = {
                    brand: details.brand,
                    name: details.name,
                    price: item.price,
                    list_price: extractDecimalNumber(details.price),
                    product_number: details.product_number,
                    image_url: details.image_url
                };

                processedItems.push(scrapedItem);
            } catch (error) {
                console.error("Failed to scrape product information:", error);
                processedItems.push(null);
            }
        } else {
            processedItems.push(classifiedItem); // Add the classified item directly
        }
    }

    return processedItems;
}

export { processItem };