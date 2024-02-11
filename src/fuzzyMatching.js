const Fuse = require('fuse.js');
const { loadProducts, addProduct } = require('./productUtils');


function fuzzyMatching(inputData, products) {
    const fuseByName = new Fuse(products, { keys: ["name"], includeScore: true });
    const fuseByPrice = new Fuse(products, { keys: ["price"], includeScore: true });

    const nameWeight = 0.5;
    const priceWeight = 0.5;

    const matchedProducts = inputData.map(inputItem => {
        // Perform separate searches
        const resultsByName = fuseByName.search(inputItem.name);
        const resultsByPrice = fuseByPrice.search(inputItem.price);
        
        let combinedResults = [];
        
        // Combine the results
        resultsByName.forEach(nameResult => {
            resultsByPrice.forEach(priceResult => {
                if (nameResult.item === priceResult.item) {
                    // Assuming scores are on a 0-1 scale and lower is better
                    let combinedScore = (nameResult.score * nameWeight) + (priceResult.score * priceWeight);
                    combinedResults.push({ item: nameResult.item, score: combinedScore });
                }
            });
        });

        // Sort combined results by the combined score
        combinedResults.sort((a, b) => a.score - b.score);
        
        // Select the best match
        if (combinedResults.length > 0) {
            return { input: inputItem, match: combinedResults[0].item, score: combinedResults[0].score };
        } else {
            return { input: inputItem, match: null, score: null };
        }
    });

    return matchedProducts;
}


module.exports = fuzzyMatching;