import Fuse from 'fuse.js';
import fs from 'fs';
import { logError } from '../logger.js'; // Adjust the path as necessary

function fuzzyMatching(inputData, products) {
    try {
        const enhancedProducts = products.map(p => ({
            ...p,
            brandName: `${p.brand} ${p.name}`
        }));

        const fuseByName = new Fuse(products, { keys: ["name"], includeScore: true });
        const fuseByPrice = new Fuse(products, { keys: ["price"], includeScore: true });
        const fuseByBrandName = new Fuse(enhancedProducts, { keys: ["brandName"], includeScore: true });

        const nameWeight = 0.6;
        const priceWeight = 0.4;

        const matchedProducts = inputData[0].map(inputItem => {
            try {
                const resultsByName = fuseByName.search(inputItem.item_desc);
                const resultsByPrice = fuseByPrice.search(inputItem.price);
                const resultsByBrandName = fuseByBrandName.search(inputItem.item_desc);

                let combinedResults = [];

                resultsByName.forEach(nameResult => {
                    resultsByBrandName.forEach(brandNameResult => {
                        if (nameResult.item.product_number === brandNameResult.item.product_number) {
                            if (nameResult.score > brandNameResult.score) {
                                nameResult = brandNameResult;
                            }
                        }
                    });
                    resultsByPrice.forEach(priceResult => {
                        if (nameResult.item === priceResult.item) {
                            let combinedScore = (nameResult.score * nameWeight) + (priceResult.score * priceWeight);
                            combinedResults.push({ item: nameResult.item, score: combinedScore });
                        }
                    });
                });

                combinedResults.sort((a, b) => a.score - b.score);

                if (combinedResults.length > 0) {
                    return { input: inputItem, match: combinedResults[0].item, score: combinedResults[0].score };
                } else {
                    return { input: inputItem, match: null, score: null };
                }
            } catch (error) {
                logError(`Error processing input item ${inputItem}: ${error}`);
                return { input: inputItem, match: null, score: null, error: true };
            }
        });

        return matchedProducts;
    } catch (error) {
        logError(`Error in fuzzyMatching function: ${error}`);
        // Handle the error appropriately
        return []; // Return an empty array or appropriate error response
    }
}

export default fuzzyMatching;
