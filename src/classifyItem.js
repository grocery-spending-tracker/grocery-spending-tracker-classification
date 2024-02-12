const fuzzyMatching = require('./fuzzyMatching');
const getProductDetails = require('./getProductDetails');
const { loadProducts, addProduct } = require('./productUtils');


function extractDecimalNumber(inputString) {
    if (inputString == null) {
        return null;
    }
    // Regular expression to find a dollar sign followed by digits and optional decimal part
    const regex = /\$([\d,]+\.?\d*)/;
    const match = inputString.match(regex);

    if (match) {
        // Remove commas (if any) and convert to float
        const numberAsString = match[1].replace(/,/g, '');
        return parseFloat(numberAsString);
    }

    return null; // Return null if no matching pattern is found
}

async function classifyItem(inputItem) {
    // Load products for fuzzy matching
    const products = loadProducts();

    // Perform fuzzy matching
    const match = fuzzyMatching(inputItem, products);

    // Set a threshold for an acceptable match score
    const threshold = 0.4; // Example threshold, adjust based on your needs

    let classifiedItem;

    console.log(match[0].score) 

    if (match && match[0].score < threshold) {
        // If the match is good enough, use it directly
        classifiedItem = {
            // store: inputItem[0].store,
            brand: match[0].match.brand,
            name: match[0].match.name,
            price: match[0].match.price,
            was_price: match[0].match.was_price,
            product_number: match[0].match.product_number,
            image_url: match[0].match.image_url
        };

        console.log("Fuzzy matched item with a score of ", match[0].score) 

    } else {
        // If the match is not good enough, scrape the website
        const details = await getProductDetails(inputItem[0].item_key);

        classifiedItem = {
            store: "Fortinos",
            brand: details.brand,
            name: details.name,
            price: extractDecimalNumber(details.price),
            was_price: extractDecimalNumber(details.was_price),
            product_number: details.product_number,
            image_url: details.image_url
        };

        console.log("Web scraped item") 

        const productExists = products.some(product => product.product_number === classifiedItem.product_number);
        // If the classified item is not in the product list, add it using addProduct
        if (!productExists) {
            addProduct(classifiedItem);
            console.log("Added classified product item")
        }
    }

    return classifiedItem;
}

// Example input item
const inputItem = [{
    // store: "Fortinos", 
    item_key: "2002040", 
    item_desc: "LEAN GRND BEEF", 
    price: "7.20"
}];

classifyItem(inputItem)
    .then(classifiedItem => console.log(classifiedItem))
    .catch(error => console.error(error));


module.exports = classifyItem;
