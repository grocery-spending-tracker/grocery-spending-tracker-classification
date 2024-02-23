import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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

export { loadProducts, addProduct, extractDecimalNumber };