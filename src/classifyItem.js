const fuzzyMatching = require('./fuzzyMatching');
const getProductDetails = require('./getProductDetails');
const loadProducts = require('./loadProducts');

async function classifyItem(inputItem) {
    // Load products for fuzzy matching
    const products = loadProducts();

    let newProduct = {
        store: "Fortinos",
        brand: "President's Choice",
        name: "Italian Sausage Pasta Sauce",
        price: "4.49",
        was_price: null,
        product_number: "21004178_EA",
        image_url: "https://assets.shop.loblaws.ca/products/21004178/b1/en/front/21004178_front_a01.png"
    };
    
    // Add the new product to the array
    products.push(newProduct);

    // Perform fuzzy matching
    const match = fuzzyMatching(inputItem, products);

    // Set a threshold for an acceptable match score
    const threshold = 0.36; // Example threshold, adjust based on your needs

    let classifiedItem;

    if (match && match[0].score < threshold) {
        // If the match is good enough, use it directly
        classifiedItem = {
            store: inputItem[0].store,
            brand: match[0].match.brand,
            name: match[0].match.name,
            price: match[0].match.price,
            was_price: match[0].match.was_price,
            product_number: match[0].match.product_number,
            image_url: match[0].match.image_url
        };
    } else {
        // If the match is not good enough, scrape the website
        const details = await getProductDetails(inputItem[0].sku);
        classifiedItem = {
            store: inputItem[0].store,
            brand: details.brand,
            name: details.name,
            price: inputItem[0].price, // Use the provided price
            was_price: details.was_price,
            product_number: details.product_number,
            image_url: details.image_url
        };
    }

    return classifiedItem;
}

// Example input item
const inputItem = [{
    store: "Fortinos", 
    sku: "08390000636", 
    name: "NESTEA ICED TEA", 
    price: "3.79"
}];

classifyItem(inputItem)
    .then(classifiedItem => console.log(classifiedItem))
    .catch(error => console.error(error));


module.exports = classifyItem;
