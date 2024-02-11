const fs = require('fs');

function loadProducts() {
    // Use the correct path to the products.json file
    const rawData = fs.readFileSync('./products.json');
    const products = JSON.parse(rawData);
    return products;
}

module.exports = loadProducts;
