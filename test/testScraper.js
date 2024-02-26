import getProductDetails from "../src/scraper/fetchProductDetails.js";

const inputItem = "06038318640"; // Example SKU

getProductDetails(inputItem)
    .then(productDetails => console.log(productDetails))
    .catch(error => logError(error));