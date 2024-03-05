import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import sandbox from 'sinon';

import fuzzyMatch from '../../src/classification/fuzzyMatching.js';
import Logger from '../../src/logger.js';
import utilClassification from '../../src/classification/util.js'

use(chaiHttp);

describe('FRT-M9: Test match product details using classification module', () => {
    let mockValidInputData, mockInvalidInputData, mockProducts, logErrorStub;
    
    mockValidInputData = [{
        item_key: '06038318916', 
        item_desc: 'PC ITAL SAUS', 
        price: '4.29', 
        taxed: false
    }];

    mockInvalidInputData = [{}];

    mockProducts = utilClassification.loadProducts();

    beforeEach(() => {
        logErrorStub = sandbox.stub(Logger, 'logError').callsFake(() => {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    /**
     * Tests for FRT-M9-7
     */
    describe('FRT-M9-7: Test fuzzyMatching()', async () => {

        /**
         * FRT-M9-7a
         * Initial State: none
         * Input: list of valid inputData and list of product details
         * Output: list containing details of input item, best match item details, and best match score
         * Derivation: the classification module must match input data with the correct product item from products list.
         */
        it('FRT-M9-7a: Should fuzzy match item and return best match item details and score', async () => {
            const expectedFuzzyMatch = [{ 
                input: {
                    item_key: '06038318916', 
                    item_desc: 'PC ITAL SAUS', 
                    price: '4.29', 
                    taxed: false
                }, 
                match: {
                    store: 'Fortinos', 
                    brand: 'Pantanella', 
                    image_url: 'https://assets.shop.loblaws.ca/products/20251188008/b3/en/front/20251188008_front_a06_@2.png',
                    name: 'Spelt Pasta', 
                    price: 'sale\n$4.29', 
                    product_number: '20251188008_EA',
                    was_price: 'was\n$4.49'
                }, 
                score: 0.4388331601616838
            }];
            const fuzzyMatchReturn = await fuzzyMatch.fuzzyMatching(mockValidInputData, mockProducts);
            // console.log(fuzzyMatch);
            expect(fuzzyMatchReturn).to.deep.equal(expectedFuzzyMatch);
        });

        /**
         * FRT-M9-7b
         * Initial State: none
         * Input: list of invalid inputData and list of product details
         * Output: empty list
         * Derivation: the classification module must ensure continuation of service after invalid itemData input to ensure robustness of code.
         */
        it('FRT-M9-7b: Should try to fuzzy match invalid item but fail and return empty list', async () => {
            const expectedFuzzyMatch = [{ 
                input: {}, 
                match: null, 
                score: null, 
                error: true 
            }];
            const fuzzyMatchReturn = await fuzzyMatch.fuzzyMatching(mockInvalidInputData, mockProducts);
            // console.log(fuzzyMatch);
            expect(fuzzyMatchReturn).to.deep.equal(expectedFuzzyMatch);
        });
    });
});
