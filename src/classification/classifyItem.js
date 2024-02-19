const fuzzyMatching = require('./fuzzyMatching'); 
const { loadProducts, addProduct, extractDecimalNumber } = require('./util'); 

async function classifyItem(inputItem) {
    const products = loadProducts();
    inputItem[0]["price"] = String(inputItem[0]["price"]);
    const match = fuzzyMatching(inputItem, products);
    const threshold = 0.4;
    let classifiedItem;
    
    if (match[0].match && match[0].score < threshold) {
        classifiedItem = {
            brand: match[0].match.brand,
            name: match[0].match.name,
            price: match[0].match.price,
            was_price: match[0].match.was_price,
            product_number: match[0].match.product_number,
            image_url: match[0].match.image_url
        };
        console.log("Fuzzy matched item with a score of ", match[0].score);
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
    
    classifyItem(inputItem)
        .then(classifiedItem => console.log(classifiedItem))
        .catch(error => console.error(error));
}

module.exports = classifyItem;
