import fuzzyMatch from './fuzzyMatching.js'; 
import util from './util.js'; 

async function classifyItem(inputItem) {
    const products = util.loadProducts();

    let inputCopy = [...inputItem];
    inputCopy[0] = { ...inputCopy[0] };
    inputCopy[0]["price"] = String(inputCopy[0]["price"]);

    const match = fuzzyMatch.fuzzyMatching(inputCopy, products);
    const threshold = 0.4;
    let classifiedItem = [];
    
    if (match[0].match && match[0].score < threshold) {
        classifiedItem = {
            brand: match[0].match.brand,
            name: match[0].match.name,
            price: match[0].match.price,
            was_price: match[0].match.was_price,
            product_number: match[0].match.product_number,
            image_url: match[0].match.image_url
        };
        // console.log("Fuzzy matched item with a score of ", match[0].score);
    }

    return classifiedItem;
}

export default classifyItem;