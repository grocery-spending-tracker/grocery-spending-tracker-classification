const classifyItem = require('./classification/classifyItem');
const getProductDetails = require('./scraper/fetchProductDetails');
const { loadProducts, addProduct, extractDecimalNumber } = require('./classification/util'); // Adjust path as needed

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

if (require.main === module) {
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