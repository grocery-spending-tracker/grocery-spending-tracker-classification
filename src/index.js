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
                price: extractDecimalNumber(item[0].price),
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

// require.main === module converted to esm
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
    const inputItem = [{
        // store: "Fortinos", 
        "item_key": "06038318640",
        "item_desc": "PCO CREMINI 227",
        "price": "1.99"
    }];
    
    processItem(inputItem)
        .then(result => console.log(result))
        .catch(error => console.error(error));
}