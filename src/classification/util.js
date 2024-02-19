const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'products.json');

function loadProducts() {
    try {
        const rawData = fs.readFileSync(productsFilePath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
}

function addProduct(newProduct) {
    const products = loadProducts();
    products.push(newProduct);
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
        console.log('Product added successfully.');
    } catch (error) {
        console.error('Error saving the new product:', error);
    }
}

function extractDecimalNumber(inputString) {
    if (inputString == null) {
        return null;
    }

    const regex = /\$?([\d,]+\.?\d*)/;
    const match = inputString.match(regex);
    if (match) {

        const numberAsString = match[1].replace(/,/g, '');
        return parseFloat(numberAsString);
    }

    return null; // Return null if no matching pattern is found
}

module.exports = { loadProducts, addProduct, extractDecimalNumber };
