const fs = require('fs');

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

// Function to extract and convert price to a decimal
function convertPriceToDecimal(priceStr) {
    if (!priceStr) return null;

    const matches = extractDecimalNumber(priceStr);

    return matches;
}

// Load the products
const productsData = fs.readFileSync('./products.json', 'utf8');
const products = JSON.parse(productsData);

// Convert price strings to decimals
products.forEach(product => {
    product.price = convertPriceToDecimal(product.price);
    product.was_price = convertPriceToDecimal(product.was_price);
});

// Save the updated products array back to the JSON file
fs.writeFileSync('./updated_products.json', JSON.stringify(products, null, 2), 'utf8');

console.log('Prices converted to decimals and saved to updated_products.json');