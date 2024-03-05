import classifyItem from './classification/classifyItem.js';
import getProductDetails from './scraper/fetchProductDetails.js';
import utilClassification from './classification/util.js';

async function processItem(items) {
    const products = utilClassification.loadProducts();    
    const processedItems = []; 

    for (const item of items) {
        const classifiedItem = await classifyItem([item]);

        if (!classifiedItem.length) {
            try {
                const details = await getProductDetails(item.item_key);
                const productExists = products.some(product => product.product_number === details.product_number);
                if (!productExists) {
                    utilClassification.addProduct(details);
                    console.log("Added classified product item")
                }

                const scrapedItem = {
                    brand: details.brand,
                    name: details.name,
                    price: item.price,
                    list_price: utilClassification.extractDecimalNumber(details.price),
                    product_number: details.product_number,
                    image_url: details.image_url
                };

                processedItems.push(scrapedItem);
            } catch (error) {
                console.error("Failed to scrape product information:", error);
                processedItems.push(null);
            }
        } else {
            processedItems.push(classifiedItem); 
        }
    }

    return processedItems;
}

export default { processItem };